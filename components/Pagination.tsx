"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { fromUrlQuery } from "@/lib/utils";

interface PaginationProps {
    page: number | string;
    totalPages: number;
    urlParamName?: string;
}

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
    
    const router = useRouter();
    const searchParams = useSearchParams();

    function onClick(btnType: string) {
        const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

        const newUrl = fromUrlQuery({
            params: searchParams.toString(),
            key: urlParamName || "page",
            value: pageValue.toString()
        })

        router.push(newUrl, { scroll: false })
    }
    
    return (
    <div className="flex gap-2">
        <Button size="lg" className="w-28" variant="outline" onClick={() => onClick("prev")} disabled={Number(page) <= 1}>Previous</Button>
        <Button size="lg" className="w-28" variant="outline" onClick={() => onClick("next")} disabled={Number(page) >= totalPages}>Next</Button>
    </div>
    )
}

export default Pagination