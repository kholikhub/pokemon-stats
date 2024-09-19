import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import {useState} from "react";
import NavigationGlobal from "../../Components/NavigationGlobal"
import FooterComponent from "../../Components/FooterComponent";
import {useRouter} from 'next/navigation'


const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password Least 8 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
});

const initialValues = {
    password: "",
    email: "",
};

interface ResponseLogin {
    token: string;
}

interface FormData {
    password: string;
    email: string;
}

export default function FormLogin() {

    const router = useRouter()

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fulfillOne, setFulfillOne] = useState("");

    async function onSubmit(e: any) {
        e.preventDefault()
        // console.log(e.target.email.value)
        setEmail(e.email);
        setPassword(e.password);

        // POST
        const body: FormData = {
            "email": e.target.email.value,
            "password": e.target.password.value,

        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };

        try {
            const response = await fetch('https://library-crud-sample.vercel.app/api/user/login', options);
            // handle kalo error harus ngapain
            if (!response.ok) {
                throw new Error('invalid email or password');
            }

            const data: ResponseLogin = await response.json();
            console.log(data);

            // next move
            setTimeout(() => {
                alert("Login Success");
                localStorage.setItem('token', data.token);
                router.push("/dashboard/profile");
            }, 500);

        } catch (error) {
            console.error('Error:', error);
            alert("invalid email or password");
        }
    }

    const handlePage = (props: FormikProps<FormData>) => {
        if (
            props.values.password &&
            props.values.email &&
            !props.errors.password &&
            !props.errors.email
        ) {
            setFulfillOne("");
        } else {
            setFulfillOne("Form is not valid");
        }
    };
    return (
        <>
            <NavigationGlobal/>
            <div className="mt-5 flex justify-center">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(props) => (
                        <div className=" border-black border-2 p-6 my-52 bg-rose-500 rounded-lg">
                            <Form onSubmit={onSubmit}>
                                <div>
                                    <p className=" font-bold">{fulfillOne}</p>
                                    <h2 className="font-bold m-4 text-white">LOGIN ACCOUNT</h2>

                                    <div className="mt-5 text-black ">
                                        <label className="text-white " htmlFor="email">
                                            Email
                                        </label>
                                        <div>
                                            <Field
                                                id="email"
                                                name="email"
                                                placeholder=" pokemon@gmail.com"
                                                type="email"
                                                className="border-black pl-2  w-full border-2 mt-5 pt-1 rounded "
                                            />
                                            <ErrorMessage

                                                name="email"
                                                component="div"
                                                className="feedback mt-4 text-black font-bold w-full"
                                            />
                                        </div>
                                    </div>
                                    <div className=" mt-4 text-white">
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div>
                                        <Field
                                            className=" border-black border-2 pl-2 mb-5 mt-5 pr-20 pt-1 rounded  "
                                            id="password"
                                            name="password"
                                            placeholder=" ******* "
                                            type="password"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="feedback text-black font-bold"
                                        />
                                    </div>
                                    <div className="pt-7">
                                        <button
                                            type="submit"
                                            className=" hover:bg-sky-400 border-black text-black font-bold border-2 p-2 pr-9 bg-white"
                                            onClick={() => {
                                                handlePage(props);
                                            }}
                                        >
                                            LOGIN
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
            <div>
                <FooterComponent/>
            </div>
        </>
    )
}
