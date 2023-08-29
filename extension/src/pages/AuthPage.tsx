import { AuthForm } from "@/components/AuthForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { storage } from "@/lib/storage";
import { errorKey } from "@/lib/utils";

export const AuthPage = () => {
  return (
    <Tabs defaultValue="login" onValueChange={() => storage.remove(errorKey)}>
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Cadastro</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardDescription>
              <span>Insira seu email e senha para ver suas tarefas</span>.
              <br />
              <span>&nbsp;</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm formType={"login"} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="register">
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
          <CardContent>
            <AuthForm formType={"register"} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
