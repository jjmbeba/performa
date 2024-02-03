"use client";

import { useEffect, useState } from "react";

import { getParentStudents, supabase } from "@/app/auth-actions/client/actions";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, List, Loader2 } from "lucide-react";
import { toast } from "sonner";
import StudentGrid from "@/components/StudentGrid";
import { columns } from "@/tables/students/columns";
import DataTable from "@/components/ui/data-table";
import AddChildButton from "@/components/AddChildButton";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

const Page = () => {
  const [dataLayout, setDataLayout] = useState("grid");
  const router = useRouter();

  const {
    data: students,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const students = await getParentStudents();

      return students;
    },
  });

  if (error) {
    toast.error(error.message);
  }

  useEffect(() => {
    const students = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "students" },
        (payload) => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(students);
    };
  }, [supabase, router]);

  return (
    <div>
      <div className="flex items-center justify-between font-bold">
        <h1 className="text-3xl ">My children</h1>
        <AddChildButton />
      </div>
      {isLoading ? (
        <div className="h-[80dvh] w-full flex flex-col items-center justify-center">
          <Loader2 className=" h-10 w-10 animate-spin" />
          <p>Hold on. Loading your registered children...</p>
        </div>
      ) : (
        <div>
          <div className="flex items-center cursor-pointer">
            <Badge
              variant={"outline"}
              className={`mt-5 h-9 rounded-r-none ${
                dataLayout === "grid" && "bg-primary"
              }`}
              onClick={() => setDataLayout("grid")}
            >
              <LayoutGrid className={`py-1 `} />
            </Badge>
            <Badge
              variant={"outline"}
              className={`mt-5 h-9 rounded-l-none ${
                dataLayout === "list" && "bg-primary"
              }`}
              onClick={() => setDataLayout("list")}
            >
              <List className="py-1" />
            </Badge>
          </div>
          {dataLayout === "grid" && (
            <StudentGrid students={students?.students} />
          )}
          {dataLayout === "list" && students?.students && (
            <DataTable data={students.students} columns={columns} />
          )}
        </div>
      )}
    </div>
  );
};
export default Page;
