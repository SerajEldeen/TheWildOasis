import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowComponent from "../../ui/FormRowComponent";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import Spinner from "../../ui/Spinner";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  if (isPending) return <Spinner />;
  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset,
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowComponent label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isPending}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRowComponent>

      <FormRowComponent label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRowComponent>

      <FormRowComponent
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isPending}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message:
                "Please Provide a valid password of minimum 8 characters",
            },
          })}
        />
      </FormRowComponent>

      <FormRowComponent
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password need to match",
          })}
        />
      </FormRowComponent>

      <FormRowComponent>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isPending}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </FormRowComponent>
    </Form>
  );
}

export default SignupForm;
