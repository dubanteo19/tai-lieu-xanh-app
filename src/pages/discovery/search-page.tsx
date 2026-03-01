import { SearchFilter } from "@/features/discovery/components/SearchFilter";
import { SearchResult } from "@/features/discovery/components/SerachResult";
import {
  DocType,
  SearchFilters,
} from "@/features/discovery/types/discovery.type";
import { useSearchPostsQuery } from "@/features/post/post-list/api/post.api";
import FullLoading from "@/shared/components/full-loading";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchFilters>({
    majorId: searchParams.get("major") || null,
    keyword: searchParams.get("keyword") || null,
    fileType: (searchParams.get("fileType") as DocType) || DocType.PDF,
    tags: searchParams.getAll("tags") || [],
    sortBy: "createdDate",
    direction: "DESC",
    page: 0,
  });

  const { data: posts, isLoading } = useSearchPostsQuery(filters);
  useEffect(() => {
    /* const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value) {
        params.set(key, value);
      }
    });
    setSearchParams(params); */
  }, [filters, setSearchParams]);

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };
  if (isLoading) return <FullLoading />;
  if (!posts.length)
    return (
      <div>
        <p>Không tìm thấy tài liệu</p>
        <span>SentimentVeryDissatisfiedIcon</span>
      </div>
    );
  return (
    <div>
      <h4>Tìm kiếm tài liệu</h4>
      <SearchFilter onFiltersChange={handleFiltersChange} filters={filters} />
      <SearchResult isLoading={isLoading} posts={posts} />
    </div>
  );
};
