export default function Login() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-120 gap-3 p-10 border-1 border-blue-700">
        <h1 className="text-2xl font-semibold text-white text-center mb-2">
          로그인
        </h1>
        <input
          className="bg-gray-700 border border-gray-600 text-white p-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="아이디를 입력해주세요. (default ID : mandoo)"
        />
        <input
          className="bg-gray-700 border border-gray-600 text-white p-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="비밀번호를 입력해주세요. (default PW : meow)"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-medium transition-colors duration-200 mt-2">
          로그인
        </button>
      </div>
    </div>
  );
}
