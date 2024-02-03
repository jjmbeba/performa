"use client";

import {
  addStudent,
  getExistingClasses,
  getSession,
} from "@/app/auth-actions/client/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { UserAddOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const addChildSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  gender: z.string(),
  year_enrolled: z.string({
    required_error: "Enrollment year is required.",
  }),
  class_id: z.string({
    required_error: "Class is required.",
  }),
});

const AddChildButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { session, error } = await getSession();

      if (error) {
        toast.error(error.message);
      }

      return session?.user;
    },
  });

  const {
    data: classes,
    error: classError,
    isLoading,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const classes = await getExistingClasses();

      return classes;
    },
  });

  if (classError) {
    toast.error(classError.message);
  }

  const form = useForm<z.infer<typeof addChildSchema>>({
    resolver: zodResolver(addChildSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      class_id: "",
      year_enrolled: "",
    },
  });

  const {
    data,
    error: newStudentError,
    isPending,
    mutate,
    isSuccess,
  } = useMutation({
    mutationKey: ["new_student"],
    mutationFn: async (values: z.infer<typeof addChildSchema>) => {
      if (!user || !user.id) {
        redirect("/login");
      }

      const { data, error } = await addStudent({
        ...values,
        class_id: Number(values.class_id),
        parent_id: user?.id,
      });

      return { data, error };
    },
  });

  if (newStudentError) {
    toast.error(newStudentError.message);
  }

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setDialogOpen(false);
      toast.success("Student added successful");
    }
  }, [isSuccess]);

  function onSubmit(values: z.infer<typeof addChildSchema>) {
    mutate(values);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <div className={cn(buttonVariants({
          variant:'default'
        }))}>
          <UserAddOutlined className="mr-2 w-4  h-4" />
          Add child
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Add your child as a student
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 py-6"
            >
              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="class_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                      </FormControl>
                      {isLoading ? (
                        <p>Hang on. Fetching available classes</p>
                      ) : (
                        <SelectContent>
                          {classes?.data?.map(({ id, class_name }) => (
                            <SelectItem
                              key={id.toString()}
                              value={id.toString()}
                            >
                              {class_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      )}
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year_enrolled"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year enrolled</FormLabel>
                    <FormControl>
                      <Input placeholder="2000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                Add child
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddChildButton;
