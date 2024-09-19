import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import {useState} from "react";
import NavigationGlobal from "../../Components/NavigationGlobal"
import FooterComponent from "../../Components/FooterComponent";
import {useRouter} from 'next/navigation'


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, "Too short!")
        .max(15, "Must be 15 characters or less")
        .required("Username is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password least 8 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
});

const initialValues = {
    name: "",
    password: "",
    email: "",
};

interface FormData {
    name: string;
    password: string;
    email: string;
}

export default function Register() {

    const router = useRouter()

    const [name, setName,] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [fulfillOne, setFulfillOne] = useState("");

    async function onSubmit(e: FormData | any) {
        e.preventDefault()
        // console.log(e.target.email.value)
        // alert(JSON.stringify(e, null, 10));
        setName(e.name);
        setPassword(e.password);
        setEmail(e.email);

        // POST
        const body: FormData = {
            "name": e.target.name.value,
            "password": e.target.password.value,
            "email": e.target.email.value,
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };

        try {
            const response = await fetch('https://library-crud-sample.vercel.app/api/user/register', options);
            // handle kalo error harus ngapain
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);

            // next move
            setTimeout(() => {
                alert("Register Success");
                router.push('/login/formLogin');
            }, 500);

        } catch (error) {
            console.error('Error:', error);

        }
    }

    const handlePage = (props: FormikProps<FormData>) => {
        if (
            props.values.name &&
            props.values.password &&
            props.values.email &&
            !props.errors.name &&
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
            <div className="mt-5 flex justify-center ">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(props) => (
                        <div className=" border-black border-2 py-5 px-20 my-28 bg-rose-500 rounded-lg">
                            <Form onSubmit={onSubmit}>
                                <div>
                                    <p className=" font-bold">{fulfillOne}</p>
                                    <h2 className="font-bold m-5 text-white ">REGISTER ACCOUNT</h2>
                                    <div className=" text-white">
                                        <label htmlFor="name">User Name</label>
                                    </div>
                                    <div className="text-white">
                                        <input
                                            value={props.values.name}
                                            className="border-black border-2 pl-2 text-black mb-5 mt-5 pr-3 w-full pt-1 rounded"
                                            name={"name"}
                                            onChange={props.handleChange("name")}
                                            // status={props.errors.name && "error"}
                                        />
                                        <br/>
                                        {props.errors.name && (
                                            <div
                                                className=" text-black font-bold text-base">
                                                {props.errors.name}
                                            </div>
                                        )}

                                    </div>
                                    <div className="text-white mt-4">
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div>
                                        <Field
                                            className=" pl-2 border-black text-black border-2 mb-5 mt-5 bg-slate-100 pt-1 rounded w-full"
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

                                    <div className="text-white mt-5">
                                        <label className="" htmlFor="email">
                                            Email
                                        </label>
                                        <div>
                                            <Field
                                                id="email"
                                                name="email"
                                                placeholder="  zaza@gmail.com"
                                                type="email"
                                                className=" pl-2 border-black border-2 mt-5 text-black pt-1 rounded w-full mr-10"
                                            />
                                            <br/>
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="feedback mt-4 text-black font-bold"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-7">
                                        <button
                                            type="submit"
                                            className=" hover:bg-sky-400 border-black text-black font-bold border-2 p-2 pr-9 bg-white"
                                            onClick={() => {
                                                handlePage(props);
                                            }}
                                        >
                                            REGISTER
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
