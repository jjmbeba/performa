"use client";

import { Student, StudentData } from "@/utils/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

type Props = {
  students: any[] | null | undefined;
};

const StudentGrid = ({ students }: Props) => {
  return (
    <div className="mt-10 grid grid-cols-3 gap-8">
      {students?.map((student) => (
          <Card key={student.id} className="cursor-pointer">
            <CardHeader>
              <CardTitle>
                {student.first_name} {student.last_name}
              </CardTitle>
              <CardDescription>Grade 1 </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Gender: {student.gender}</p>
            </CardContent>
            <CardFooter>
              <p>Year enrolled: {student.year_enrolled}</p>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default StudentGrid;
