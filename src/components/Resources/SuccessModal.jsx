import { Check, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export function SuccessModal({ isOpen, onClose, noticeTitle }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      <div className="relative z-10 mx-4 w-full max-w-lg rounded-lg bg-white p-8 shadow-xl">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500">
            <Check className="h-10 w-10 text-white stroke-[3]" />
          </div>
        </div>

        <h2 className="mb-4 text-center text-2xl font-bold text-gray-900">
          Notice Published Successfully
        </h2>

        <p className="mb-8 text-center text-sm text-gray-600 leading-relaxed">
          Your notice{" "}
          <span className="font-semibold">
            "{noticeTitle || "Holiday Schedule – November 2025"}"
          </span>{" "}
          has been published and is now visible to all selected departments.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/employee/database">
            <Button
              variant="outline"
              className="min-w-[120px] border-blue-500 text-blue-600 hover:bg-blue-50"
              onClick={onClose}
            >
              View Notice
            </Button>
          </Link>
          <Button
            variant="outline"
            className="min-w-[140px] border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            <Plus className="h-4 w-4" />
            Create Another
          </Button>
          <Button
            variant="outline"
            className="min-w-[100px] border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
