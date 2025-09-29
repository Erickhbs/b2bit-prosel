import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/userAuth";
import { toast } from "sonner";
import b2bitLogo from "@/assets/b2bitlogo.png";
import type { LoginFormValues } from "@/types/loginFormValues";
import { useEffect } from "react";

const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Obrigatório"),
  password: Yup.string().min(8, "Senha muito curta").required("Obrigatório"),
});

export default function LoginPage() {
  const { login, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      navigate("/profile", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm space-y-6 rounded-xl bg-white p-8 shadow-xl">
        <img src={b2bitLogo} alt="B2BIT Logo" className="mx-auto" />
        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values: LoginFormValues, { setSubmitting }) => {
            try {
              const success = await login(values.email, values.password);
              if (success) {
                navigate("/profile", { replace: true });
              } else {
                toast.error("Login Error", {
                  description: error || "Credenciais inválidas. Verifique email e senha.",
                });
              }
            } catch (error: unknown) {
              const message =
                error instanceof Error
                  ? error.message
                  : "Erro ao fazer login. Tente novamente.";
              toast.error("Erro de Login", { description: message });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-8">
              <div className="space-y-4">
                <Label htmlFor="email">E-mail</Label>
                <Field
                  id="email"
                  name="email"
                  as={Input}
                  type="email"
                  placeholder="@gmail.com"
                  className="p-6 bg-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-b2bit-blue/50"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="password">Password</Label>
                <Field
                  id="password"
                  name="password"
                  as={Input}
                  type="password"
                  placeholder="**************"
                  className="p-6 bg-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-b2bit-blue/50"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="p-6 w-full bg-blue-950 text-white hover:bg-blue-950/90"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}