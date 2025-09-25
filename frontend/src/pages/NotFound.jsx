import React from 'react'

const NotFound = () => {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
            <img
                src="/404_NotFound.png" // để ảnh trong thư mục public
                alt="404 Not Found"
                className="w-[400px] max-w-full mb-6"
            />
            <p className="text-xl font-semibold mb-4">
                Bạn đang đi vào vùng cấm địa 🚫
            </p>
            <a
                href="/"
                className="inline-block px-6 py-3 font-medium text-white bg-purple-600 rounded hover:bg-purple-700"
            >
                Quay về trang chủ
            </a>
        </div>
    )
}

export default NotFound
