import { SubmitHandler, useForm } from 'react-hook-form';
import { useModalStore } from '../../zustand/showModal';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants/regex.constants';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface SignUpForm {
  email: string;
  password: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();
  const { setVersion } = useModalStore();

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    alert('등록되었습니다. 로그인해주세요!');

    setVersion('login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
      <div className="flex flex-col gap-2 px-8">
        <Input
          placeholder="아이디(이메일)"
          type="text"
          {...register('email', { required: true, pattern: EMAIL_REGEX })}
        />
        {errors.email && errors.email.type === 'required' && <span>This is required</span>}
        {errors.email && errors.email.type === 'pattern' && <span>이메일 형식이어야 합니다</span>}
        <Input
          type="password"
          placeholder="비밀번호는 8자 이상 20자 이하의 대소문자를 곁들인..."
          {...register('password', { pattern: PASSWORD_REGEX, required: true })}
        />
        {errors.password && errors.password.type === 'required' && (
          <span>비밀번호를 입력하세요.</span>
        )}
        {errors.password && errors.password.type === 'pattern' && (
          <span>비밀번호는 대문자와 소문자 합쳐서 8자 이상 20자 이하여야 합니다</span>
        )}
        <Button type="submit">회원가입</Button>
      </div>
    </form>
  );
}
