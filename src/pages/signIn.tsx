import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Button,
	CheckBox,
	Form,
	FormGroup,
	FormItem,
	Input,
	Loader,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import { SignInFormData, SignInProps } from "../utils/types";
import logIn from "../lib/login";

const SignIn = ({ setIsLoggedIn }: SignInProps) => {
	const [rememberMe, setRememberMe] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const signInSchema = z.object({
		username: z
			.string()
			.min(3, { message: "Username must be at least 3 characters" }),
		password: z.string().min(1, { message: "Please enter your Password" }),
		rememberMe: z.boolean().optional(),
	});

	type ValidationSchemaType = z.infer<typeof signInSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchemaType>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
		const loginValues = {
			username: data.username,
			password: data.password,
		};

		const logInData = await logIn({ loginValues, setError, setLoading });
		if (!logInData) return;

		const userData = {
			name: logInData.name,
			email: logInData.email,
			role: logInData.role,
			permissions: logInData.permissions,
		};

		setLoading(false);
		setIsLoggedIn(true);
		localStorage.setItem("userData", JSON.stringify(userData));
	};

	return (
		<div className="h-svh w-full flex justify-center items-center">
			<div className="rounded-xl p-6">
				<div>
					{error && <div className="text-red-500 text-center">{error}</div>}
					{loading && <Loader progress={60} />}
				</div>
				<Form
					style={{
						backgroundColor: "var(--sapBackgroundColor)",
					}}
					className="w-[60rem] border border-gray-200 rounded-xl p-6"
					onSubmit={handleSubmit(onSubmit)}
					titleText="Sign In Form">
					<FormGroup titleText="Login Details">
						<FormItem label="Username">
							<Input
								type="Email"
								className="mb-6 w-[50%]"
								{...register("username")}
							/>

							{errors.username && (
								<span className="text-red-500">{errors.username.message}</span>
							)}
						</FormItem>

						<FormItem label="Password">
							<Input
								className="mb-6 w-[50%]"
								type="Password"
								{...register("password")}
							/>
							{errors.password && (
								<span className="text-red-500">{errors.password.message}</span>
							)}
						</FormItem>
						<FormItem label="Remember me">
							<CheckBox
								checked={rememberMe}
								onChange={(event) => setRememberMe(event.target.checked)}
							/>
						</FormItem>
						<Button
							disabled={loading}
							design="Default"
							type="Submit"
							className="bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
							Sign In
						</Button>
					</FormGroup>
				</Form>
			</div>
		</div>
	);
};

export default SignIn;
