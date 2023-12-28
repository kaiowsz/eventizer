"use client"

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { fromUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { ICategory } from "@/lib/database/models/category.model";
import { getAllCategories } from "@/lib/actions/category.actions";

const CategoryFilter = () => {

    const [categories, setCategories] = useState<ICategory[]>([])
    const searchParams = useSearchParams()
    const router = useRouter();

    useEffect(() => {
        async function getCategories() {
            const categoryList = await getAllCategories();

            categoryList && setCategories(categoryList as ICategory[])
        }

        getCategories()
    }, [])

    function onSelectCategory(category: string) {
        let newUrl = "";

        if(category && category !== "All") {
            newUrl = fromUrlQuery({
                params: searchParams.toString(),
                key: "category",
                value: category
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ["category"]
            })
        }

        router.push(newUrl, {scroll: false})
    }

    return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
        <SelectTrigger className="select-field">
            <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="All" className="select-item p -regular-14">All</SelectItem>

            {categories.map((category) => (
                <SelectItem value={category.name} key={category._id} className="select-item p-regular-14">
                    {category.name}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
    )
}

export default CategoryFilter