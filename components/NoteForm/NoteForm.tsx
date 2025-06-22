"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import css from "./NoteForm.module.css";

// 👇 типи — строго лише для створення нотатки
interface NewNoteFormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title cannot exceed 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content cannot exceed 500 characters"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
});

const initialValues: NewNoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  return (
    <Formik<NewNoteFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        mutation.mutate(values);
        actions.setSubmitting(false);
      }}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Title
          <Field name="title" type="text" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </label>

        <label className={css.label}>
          Content
          <Field
            name="content"
            as="textarea"
            rows={4}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </label>

        <label className={css.label}>
          Tag
          <Field name="tag" as="select" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </label>

        <div className={css.actions}>
          <button type="submit" className={css.button}>
            Create note
          </button>
          <button type="button" onClick={onClose} className={css.cancel}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
