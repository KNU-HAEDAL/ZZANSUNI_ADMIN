import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {createManager} from "@/api/auth/auth.api.ts";
import {ApiError} from "@/api/ApiError.ts";
import {useState} from "react";

export default function AddManagerDialog() {
  const [isOpen, setIsOpen] = useState(false);
  function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const nickname = (document.getElementById('nickname') as HTMLInputElement).value;
    createManager({email, password, nickname})
      .then(() => {
        alert('매니저 계정이 생성되었습니다.');
        setIsOpen(false);
      })
      .catch((e) => {
        if(e instanceof ApiError){
          alert(e.message);
          setIsOpen(false);
        }
      });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">매니저 추가</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>매니저 추가</DialogTitle>
          <DialogDescription>
            매니저 계정을 추가합니다.
            <br/>
            어드민 권한을 가진 사용자만 해당 기능을 사용할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              이메일
            </Label>
            <Input
              id="email"
              defaultValue=""
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              비밀번호
            </Label>
            <Input
              id="password"
              defaultValue=""
              type="password"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nickname" className="text-right">
              닉네임
            </Label>
            <Input
              id="nickname"
              defaultValue=""
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={onSubmit}
          >계정 생성</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}