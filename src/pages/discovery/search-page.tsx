import FullLoading from "@/shared/components/FullLoading";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchPostsQuery } from "../api/postApi";
import { ISearchFilters } from "../type/ISearchFilters";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ISearchFilters>({
    major: searchParams.get("major") || "",
    keyword: searchParams.get("keyword") || "",
    fileType: searchParams.get("fileType") || "PDF",
    tags: searchParams.getAll("tags") || [],
    sort: "createdDate",
    dir: "DESC",
  });

  const { data: posts, isLoading } = useSearchPostsQuery(filters);
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value) {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFiltersChange = (newFilters: ISearchFilters) => {
    setFilters(newFilters);
  };
  if (isLoading) return <FullLoading />;
  if (!posts.length)
    return (
      <div>
        <div>
          <p>Không tìm thấy tài liệu</p>
        </div>
        <SentimentVeryDissatisfiedIcon
          sx={{ fontSize: 100 }}
          fontSize="large"
        />
      </div>
    );
  return (
    <div>
      <h4>Tìm kiếm tài liệu</h4>
      <SearchSelectList
        onFiltersChange={handleFiltersChange}
        filters={filters}
      />
      <SearchResult isLoading={isLoading} posts={posts} />
    </div>
  );
};
