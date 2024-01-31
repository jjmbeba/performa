import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const ParentSummary = () => {
  return (
    <div
      className="mt-8 grid grid-cols-4 gap-8"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap:'2rem'
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Children</CardTitle>
          <CardDescription>Number of children: 2</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant={"outline"} className="flex items-center">
            <ArrowRight className="mr-2 w-4 h-4" /> See more...
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>Upcoming events: 3</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant={"outline"} className="flex items-center">
            <ArrowRight className="mr-2 w-4 h-4" /> See more...
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ParentSummary;
