import { AuthForm } from "@/components/auth-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export const AuthPage = () => {
  return (
    <Tabs defaultValue="login">
      <TabsList className="grid items-center justify-center w-full grid-cols-2 p-1 rounded-lg h-9 bg-muted text-muted-foreground">
        <TabsTrigger
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
          value="login"
        >
          Entrar
        </TabsTrigger>
        <TabsTrigger
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
          value="register"
        >
          Cadastrar
        </TabsTrigger>
      </TabsList>
      <TabsContent
        className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value="login"
      >
        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>Insira seu email e senha</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <AuthForm formType={"login"} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Cadastrar</CardTitle>
            <CardDescription>
              Insira seu email e senha. O login será realizado automaticamente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <AuthForm formType={"register"} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
