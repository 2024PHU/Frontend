import { useEffect, useState } from 'react';
import compactup from "../../../assets/compact-up.svg";
import SubmitButton from "../button/SubmitButton";
import Input from "../Input";
import { addPTMemberApi } from '../../../store/api/user/member/MemberApi';

interface BottomSheetProps {
  onClose: () => void;
  isOpen: boolean; 
}

function BottomSheet({ onClose, isOpen }: BottomSheetProps) {
  const [email, setEmail] = useState("");
  useEffect(() => {
    // BottomSheet가 열릴 때 스크롤을 비활성화
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
  
    const response = await addPTMemberApi(email);
    if (response?.success) {
      window.alert("회원이 추가되었습니다.");
      onClose(); // 추가 후 BottomSheet 닫기
    } else {
      console.log("회원 추가 실패");
    }
  };

  return (
    <>
      <div
        className={`fixed bottom-0 w-[600px] h-[250px] bg-white border shadow-lg rounded-md transition-transform duration-300 transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } z-50`}
      >
        <div className="flex flex-col items-center justify-between p-1">
          <img
            src={compactup}
            className="w-12 transform rotate-180 cursor-pointer"
            onClick={onClose}
          />
          <span className="text-sm">추가할 회원의 이메일을 입력하세요</span>
        </div>
        <form className="flex flex-col items-center p-7" onSubmit={handleSubmit}>
          <Input
            size="medium"
            placeholder="email"
            type="email"
            className="placeholder:text-custom-softgrey"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <SubmitButton
            label="확인"
            size="small"
            className={`m-7 cursor-pointer bg-custom-blue`}
          />
        </form>
      </div>
    </>
  );
}

export default BottomSheet;
