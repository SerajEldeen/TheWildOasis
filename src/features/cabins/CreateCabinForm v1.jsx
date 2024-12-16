import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FormRow } from "../../ui/FormRowComponent";
import { createCabin } from "../../services/apiCabins";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import FormRowComponent from "../../ui/FormRowComponent";

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRowComponent label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isCreating}
        />
      </FormRowComponent>
      <FormRowComponent
        label="Maximum Capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "capacity should be at least 1",
            },
          })}
          disabled={isCreating}
        />
      </FormRowComponent>
      <FormRowComponent
        label="Regular price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
          disabled={isCreating}
        />
      </FormRowComponent>
      <FormRowComponent label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          // defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regularPrice",
          })}
          disabled={isCreating}
        />
      </FormRowComponent>
      <FormRowComponent
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
          disabled={isCreating}
        />
      </FormRowComponent>
      <FormRowComponent label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRowComponent>
      <FormRow>
        {/* /* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
