import { AuthForm } from "@/components/AuthForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export const AuthPage = () => {
  const { clearAuthErrors } = useAuth();

  return (
    <Tabs defaultValue="login" onValueChange={clearAuthErrors}>
      <TabsList className="grid items-center justify-center w-full grid-cols-2 p-1 rounded-lg h-9 bg-muted text-muted-foreground">
        <TabsTrigger
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
          value="login"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
          value="register"
        >
          Cadastro
        </TabsTrigger>
      </TabsList>
      <TabsContent
        className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value="login"
      >
        <Card>
          <CardHeader>
            <CardDescription>
              <span>Insira seu email e senha para ver suas tarefas</span>.
              <br />
              <span>&nbsp;</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <AuthForm formType={"login"} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent
        className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        value="register"
      >
        <Card>
          <CardHeader>
            <CardDescription>
              <span>Insira seu email e senha.</span>
              <br />
              <span className="text-destructive">
                O login será realizado automaticamente.
              </span>
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
