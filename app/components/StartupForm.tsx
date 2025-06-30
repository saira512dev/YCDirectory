"use client";
import Form from "next/form";
import React, { useActionState, useState } from "react";
// import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";
import dynamic from "next/dynamic";
import MDEditor from "@/components/MarkdownEditor";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);
      const result = await createPitch(prevState, formData, pitch);
      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });
        router.push(`/startup/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occured",
        variant: "destructive",
      });
      return {
        ...prevState,
        error: "An unexpected error has occured",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div className="flex flex-col">
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="start up title"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="start up description"
        />

        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="start up Category(Tech, health, finance etc..)"
        />

        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="start up image URL"
        />

        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div data-color-mod="light" className="flex flex-col">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>
      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit your Pitch"}
        <Send className="size-6 mi-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
