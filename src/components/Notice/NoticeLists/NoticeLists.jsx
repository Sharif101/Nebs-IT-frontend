import React from "react";
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
import NoticeAdd from "../NoticeAdd/NoticeAdd";

export default function NoticeLists() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Office closed on Friday for maintenance.",
      noticeType: "General / Company-W",
      department: "All Department",
      publishedOn: "15-Jun-2025",
      status: "Published",
      isPublished: true,
    },
    {
      id: 2,
      title: "Eid al-Fitr holiday schedule.",
      noticeType: "Holiday & Event",
      department: "Finance",
      publishedOn: "15-Jun-2025",
      status: "Published",
      isPublished: true,
    },
    {
      id: 3,
      title: "Updated code of conduct policy",
      noticeType: "HR & Policy Update",
      department: "Sales Team",
      publishedOn: "15-Jun-2025",
      status: "Published",
      isPublished: true,
    },
    {
      id: 4,
      title: "Payroll for October will be processed on 28th",
      noticeType: "Finance & Payroll",
      department: "Web Team",
      publishedOn: "15-Jun-2025",
      status: "Published",
      isPublished: true,
    },
    {
      id: 5,
      title: "System update scheduled for 30 Oct (9:00-11:00 PM)",
      noticeType: "IT / System Maintena",
      department: "Database Team",
      publishedOn: "15-Jun-2025",
      status: "Published",
      isPublished: true,
    },
    {
      id: 6,
      title: "Design team sprint review moved to Tuesday.",
      noticeType: "Department / Team",
      department: "Admin",
      publishedOn: "15-Jun-2025",
      status: "Published",
      isPublished: true,
    },
    {
      id: 7,
      title: "Unauthorized absence recorded on 18 Oct 2025",
      noticeType: "Warning / Disciplinary",
      department: "Individual",
      publishedOn: "15-Jun-2025",
      status: "Unpublished",
      isPublished: false,
    },
    {
      id: 8,
      title: "Office closed today due to severe weather",
      noticeType: "Emergency / Urgent",
      department: "HR",
      publishedOn: "15-Jun-2025",
      status: "Draft",
      isPublished: false,
    },
  ]);

  const [selectedNotices, setSelectedNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("departments");
  const [statusFilter, setStatusFilter] = useState("all");
  const [publishedDate, setPublishedDate] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

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
      setSelectedNotices(notices.map((n) => n.id));
    }
  };

  const togglePublishStatus = (noticeId) => {
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === noticeId
          ? {
              ...notice,
              isPublished: !notice.isPublished,
              status: !notice.isPublished ? "Published" : "Unpublished",
            }
          : notice
      )
    );
  };

  const activeNotices = notices.filter((n) => n.status === "Published").length;
  const draftNotices = notices.filter((n) => n.status === "Draft").length;

  if (showCreateForm) {
    return <NoticeAdd onClose={() => setShowCreateForm(false)} />;
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
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
                <span className="font-semibold">
                  {String(draftNotices).padStart(2, "0")}
                </span>
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              className="bg-[#F95524] hover:bg-orange-600 text-white font-[14px]"
              size="default"
              onClick={() => setShowCreateForm(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Notice
            </Button>
            <Button
              variant="outline"
              className="border border-[#F59E0B] text-[#F59E0B] font-medium hover:text-[#F59E0B]"
              size="default"
            >
              <Pencil className="mr-2 h-4 w-4" />
              All Draft Notice
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center justify-end gap-4">
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-[220px] h-9 appearance-none rounded border border-gray-200 bg-none px-3 py-2 pr-8 text-sm text-[#595F7A] shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
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
            className="w-[220px]"
          />
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-[180px] text-[#595F7A] h-9 appearance-none rounded border border-gray-300 bg-white px-3 py-2 pr-8 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              className="w-[180px] h-9 rounded border border-gray-300 bg-white px-3 pr-9 text-sm text-[#595F7A] shadow-sm focus:ring-1 focus:ring-blue-500"
            />
            <Calendar className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
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

        {/* Table */}
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
              {notices.map((notice) => (
                <TableRow key={notice.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedNotices.includes(notice.id)}
                      onCheckedChange={() => toggleNoticeSelection(notice.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {notice.title}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {notice.noticeType}
                  </TableCell>
                  <TableCell>
                    <span className="text-blue-600 font-medium">
                      {notice.department}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {notice.publishedOn}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          notice.status === "Published"
                            ? "default"
                            : notice.status === "Draft"
                            ? "secondary"
                            : "outline"
                        }
                        className={
                          notice.status === "Published"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
                            : notice.status === "Draft"
                            ? "bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200"
                        }
                      >
                        {notice.status}
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
                          {notice.status !== "Draft" && (
                            <div className="px-2 flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {notice.isPublished
                                  ? "Published"
                                  : "Unpublished"}
                              </span>

                              <div className="scale-75 origin-right mt-1">
                                <Switch
                                  checked={notice.isPublished}
                                  onCheckedChange={() =>
                                    togglePublishStatus(notice.id)
                                  }
                                />
                              </div>
                            </div>
                          )}
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
