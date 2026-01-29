import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";

const AddNewRecipe = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const [selectedImage, setSelectedImage] = useState(null);

    const { data: categories = [], isLoading: catLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosSecure.get("/categories");
            return res.data;
        },
    });

    const onSubmit = async (data) => {
        let imageUrl = "";

        if (selectedImage) {
            const formData = new FormData();
            formData.append("image", selectedImage);

            const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;

            try {
                const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
                    method: "POST",
                    body: formData,
                });

                const result = await res.json();
                imageUrl = result.data.url;
            } catch (err) {
                console.error("Image upload failed", err);
                Swal.fire("Error", "Image upload failed", "error");
                return;
            }
        }

        const recipeData = {
            title: data.title,
            category: data.category,
            cuisine: data.cuisine,
            ingredients: data.ingredients.split(",").map(i => i.trim()),
            instructions: data.instructions,
            calories: Number(data.calories),
            cookingTime: data.cookingTime,
            image: imageUrl,
            createdBy: user.email,
        };

        try {
            await axiosSecure.post("/recipes", recipeData);

            Swal.fire({
                icon: "success",
                title: "Recipe Added",
                text: "Your recipe has been added successfully",
                timer: 2000,
                showConfirmButton: false,
            });

            reset();
            setSelectedImage(null);
        } catch (err) {
            Swal.fire("Error", "Failed to add recipe", "error");
            console.error(err);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-primary mb-8">Add New Recipe</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <label className="block mb-2 font-medium">Recipe Image</label>

                    <div
                        className="border-2 border-dashed rounded-xl aspect-square flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-primary relative"
                        onClick={() => document.getElementById("imageInput").click()}
                    >
                        {selectedImage ? (
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        ) : (
                            <span className="text-sm">Upload Image</span>
                        )}
                        <input
                            id="imageInput"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => setSelectedImage(e.target.files[0])}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Square image recommended (1:1)</p>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Title</label>
                        <input
                            {...register("title", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Pasta Alfredo"
                        />
                    </div>

                    <div>
                        <label className="label">Category</label>
                        <select
                            {...register("category", { required: true })}
                            className="select select-bordered w-full"
                            disabled={catLoading}
                        >
                            <option value="">
                                {catLoading ? "Loading categories..." : "Select Category"}
                            </option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label">Cuisine</label>
                        <input
                            {...register("cuisine", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Italian"
                        />
                    </div>

                    <div>
                        <label className="label">Cooking Time</label>
                        <input
                            {...register("cookingTime")}
                            className="input input-bordered w-full"
                            placeholder="25 mins"
                        />
                    </div>

                    <div>
                        <label className="label">Calories</label>
                        <input
                            {...register("calories")}
                            type="number"
                            className="input input-bordered w-full"
                            placeholder="380"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="label">Ingredients</label>
                        <textarea
                            {...register("ingredients", { required: true })}
                            className="textarea textarea-bordered w-full"
                            rows="3"
                            placeholder="Pasta, Cream, Cheese"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Separate ingredients with commas
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <label className="label">Instructions</label>
                        <textarea
                            {...register("instructions", { required: true })}
                            className="textarea textarea-bordered w-full"
                            rows="4"
                            placeholder="Boil pasta and mix with creamy sauce..."
                        />
                    </div>
                </div>

                <div className="md:col-span-3 mt-6">
                    <button className="btn btn-primary text-white w-full md:w-auto">
                        Add Recipe
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewRecipe;
