import { useModalStore } from '@/zustand/showModal';
import { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axiosInstance from '@/apis/axios';

interface IFormInput {
  id: string;
  password: string;
}

const Login = () => {
  const checkRef = useRef<HTMLInputElement>(null);
  const { closeModal } = useModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { setVersion } = useModalStore();

  const onSubmit: SubmitHandler<IFormInput> = async (data, e) => {
    e?.preventDefault();
    // const isChecked = checkRef.current.checked;
    const { id, password } = data;

    const res = await axiosInstance.post(`/login?userId=${id}&password=${password}`);

    if (res.status === 200) {
    }
    closeModal();
    console.log(res);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full flex flex-col min-h-[400px] justify-between"
    >
      <div className="flex flex-col gap-2 px-8">
        <Input
          {...register('id', { required: true })}
          type="text"
          placeholder="아이디를 입력하세요"
        />
        {errors.id && errors.id.type === 'required' && <span>This is required</span>}
        <Input
          type="password"
          {...register('password', { required: true })}
          placeholder="비밀번호를 입력하세요"
        />
        {errors.password && errors.password.type === 'required' && <span>This is required</span>}
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button type="submit">Sign in</Button>
        <Button onClick={() => setVersion('signup')}>Sign up</Button>
      </div>
    </form>
  );
};

export default Login;
