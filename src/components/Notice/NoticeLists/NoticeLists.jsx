import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Edit,
  Eye,
  MoreVertical,
  Pencil,
  ChevronDown,
  Calendar,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/utils/api";

export default function NoticeLists() {
  const [notices, setNotices] = useState([]);
  const [selectedNotices, setSelectedNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [totalPages, setTotalPages] = useState(1);

  const [activeNotices, setActiveNotices] = useState(0);
  const [draftNotices, setDraftNotices] = useState(0);

  const [selectedNotice, setSelectedNotice] = useState(null);

  const fetchNotices = async () => {
    try {
      const query = new URLSearchParams({
        search: searchQuery,
        status: statusFilter,
        page,
        limit,
      }).toString();

      const response = await fetch(`${api}/api/notices/getall?${query}`);
      const data = await response.json();

      if (data.success) {
        const publishedCount = data.data.filter(
          (notice) => notice.isPublished && !notice.isDraft
        ).length;
        const draftCount = data.data.filter((notice) => notice.isDraft).length;

        setActiveNotices(publishedCount);
        setDraftNotices(draftCount);

        setNotices(data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [searchQuery, statusFilter, page, limit]);

  const toggleNoticeSelection = (noticeId) => {
    setSelectedNotices((prev) =>
      prev.includes(noticeId)
        ? prev.filter((id) => id !== noticeId)
        : [...prev, noticeId]
    );
  };

  const toggleAllNotices = () => {
    if (selectedNotices.length === notices.length) {
      setSelectedNotices([]);
    } else {
      setSelectedNotices(notices.map((n) => n._id));
    }
  };

  const togglePublishStatus = async (noticeId) => {
    try {
      const singleResponse = await fetch(
        `${api}/api/notices/getsingle/${noticeId}`
      );
      const singleData = await singleResponse.json();

      if (!singleData.success) {
        console.error("Failed to fetch single notice:", singleData.message);
        return;
      }

      const notice = singleData.data;
      const response = await fetch(`${api}/api/notices/update/${noticeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isPublished: !notice.isPublished,
        }),
      });

      const data = await response.json();

      if (data.success) {
        fetchNotices();
        console.log("Notice updated successfully:", data.data);
      } else {
        console.error("Error updating notice:", data.message);
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  console.log({ api });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto w-full">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Notice Management
            </h1>
            <div className="mt-2 flex items-center gap-4 text-sm">
              <span className="text-blue-600">
                Active Notices:{" "}
                <span className="font-semibold">{activeNotices}</span>
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-orange-500">
                Draft Notice:{" "}
                <span className="font-semibold">{draftNotices}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/notice/create">
              <Button
                className="bg-[#F95524] hover:bg-orange-600 text-white font-[14px]"
                size="default"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Notice
              </Button>
            </Link>

            <Button
              variant="outline"
              className="border border-[#F59E0B] text-[#F59E0B] font-medium hover:text-[#F59E0B]"
              size="default"
              onClick={(e) => setStatusFilter("draft")}
            >
              <Pencil className="mr-2 h-4 w-4" />
              All Draft Notice
            </Button>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-end gap-4">
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          <div className="relative">
            <select className="w-[220px] h-9 appearance-none rounded border border-gray-200 bg-[#F9FAFB] px-3 py-2 pr-8 text-sm text-[#595F7A] shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="departments">Departments or individuals</option>
              <option value="notice-type">Notice Type</option>
              <option value="status">Status</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-gray-500" />
          </div>
          <Input
            placeholder="Employee Id or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[220px] bg-[#F9FAFB]"
          />
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-[180px] text-[#595F7A] h-9 appearance-none rounded border border-gray-300 bg-[#F9FAFB] px-3 py-2 pr-8 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">Status</option>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
              <option value="draft">Draft</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-gray-500" />
          </div>

          <div className="relative">
            <input
              type="date"
              className="w-[180px] h-9 rounded border border-gray-300 bg-[#F9FAFB] px-3 pr-9 text-sm text-[#595F7A] shadow-sm focus:ring-1 focus:ring-blue-500"
            />
            {/* <Calendar className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" /> */}
          </div>

          <button
            onClick={() => {
              setFilterType("");
              setSearchQuery("");
              setStatusFilter("all");
              setPublishedDate("");
            }}
            className="flex h-9 items-center gap-2 rounded border border-blue-300 px-5 text-sm text-blue-600 hover:bg-gray-100"
          >
            Reset Filters
          </button>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedNotices.length === notices.length}
                    onCheckedChange={toggleAllNotices}
                  />
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Title
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Notice Type
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Departments/Individual
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Published On
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Status
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-900">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notices.data?.map((notice) => (
                <TableRow key={notice.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedNotices.includes(notice.id)}
                      onCheckedChange={() => toggleNoticeSelection(notice.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {notice?.noticeTitle}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {notice?.noticeType?.length > 0
                      ? notice?.noticeType[0]
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        notice.target === "All Department"
                          ? "text-[#4F46E5]"
                          : notice.target === "Finance"
                          ? "text-[#059669]"
                          : notice.target === "Sales Team"
                          ? "text-[#D97706]"
                          : notice.target === "Web Team"
                          ? "text-[#2563EB]"
                          : notice.target === "Database Team"
                          ? "text-gray-700"
                          : notice.target === "Admin"
                          ? "text-[#0EA5E9]"
                          : notice.target === "Individual"
                          ? "text-cyan-400"
                          : notice.target === "HR"
                          ? "text-red-500"
                          : "text-black"
                      }`}
                    >
                      {notice.target}
                    </span>
                  </TableCell>

                  <TableCell className="text-gray-600">
                    {new Date(notice.publishedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          notice.isPublished
                            ? "default"
                            : notice.isDraft
                            ? "secondary"
                            : "outline"
                        }
                        className={
                          notice.isPublished
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
                            : notice.isDraft
                            ? "bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200"
                        }
                      >
                        {notice.isPublished
                          ? "Published"
                          : notice.isDraft
                          ? "Draft"
                          : "Unpublished"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-600 hover:text-gray-900"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-600 hover:text-gray-900"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-600 hover:text-gray-900"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <div className="px-2 flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {notice.isPublished ? "Published" : "Unpublished"}
                            </span>

                            <div className="scale-75 origin-right mt-1">
                              <Switch
                                checked={notice.isPublished}
                                onClick={() => togglePublishStatus(notice._id)}
                              />
                            </div>
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
