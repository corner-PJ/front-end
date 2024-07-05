import React, { createContext, useContext, useState } from 'react';

const ReviewContext = createContext();
export const useReviewContext = () => {
    return useContext(ReviewContext);
}

const mockReview = [
    {
        id: 1,
        nickName: "미호",
        update: "2024.03.19",
        content: "유기견을 입양한 것은 정말 큰 축복이었습니다. 그는 우리의 가족에게 무한한 사랑과 즐거움을 줍니다. 우리는 그를 더 많은 사랑으로 감싸고, 그의 행복을 위해 노력할 것입니다.",
        img: [
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            "https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            "https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
        ]
    },
    {
        id: 5,
        nickName: "새벽",
        update: "2024.03.19",
        content: "유기견을 입양한 것은 정말 큰 축복이었습니다. 그는 우리의 가족에게 무한한 사랑과 즐거움을 줍니다. 우리는 그를 더 많은 사랑으로 감싸고, 그의 행복을 위해 노력할 것입니다.",
        img: [ "https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
            "https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            
           
        ]
    },
    {
        id: 2,
        nickName: "아지",
        update: "2024.09.15",
        content: "유기견을 입양한 것은 정말 큰 축복이었습니다. 그는 우리의 가족에게 무한한 사랑과 즐거움을 줍니다. 우리는 그를 더 많은 사랑으로 감싸고, 그의 행복을 위해 노력할 것입니다.",
        img: ["https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            
            "https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
        ]
    },
    {
        id: 3,
        nickName: "사랑",
        update: "2024.06.15",
        content: "유기견을 입양한 것은 정말 큰 축복이었습니다. 그는 우리의 가족에게 무한한 사랑과 즐거움을 줍니다. 우리는 그를 더 많은 사랑으로 감싸고, 그의 행복을 위해 노력할 것입니다.",
        img: ["https://img.freepik.com/free-photo/adorable-shiba-inu-dog-indoors_23-2148991912.jpg?t=st=1720115406~exp=1720119006~hmac=d6c271f2c2ebfad127ddbb6ead167fec69b3143a552c1e5ccfdfd133c143aeb5&w=740",
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            "https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            
        ]
    },
    {
        id: 4,
        nickName: "초코",
        update: "2024.03.21",
        content: "유기견을 입양한 것은 정말 큰 축복이었습니다. 그는 우리의 가족에게 무한한 사랑과 즐거움을 줍니다. 우리는 그를 더 많은 사랑으로 감싸고, 그의 행복을 위해 노력할 것입니다.",
        img: [ "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            "https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
        ]
    },
]

const mockReivewComments = [
    {
        id: '후추구름',
        text: '(❤️ ω ❤️)',
        date: '2024.04.02.9:12',
        isSecret: false,
        replies: []
    },
]

const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState(mockReview);
    const [reviewsComments, setReviewsComments] = useState(mockReivewComments);

    const addReview = (newReview) => {
        setReviews([...reviews, newReview]);
    };

    const addReviewComment = (newComment) => {
        const commentData = {
            ...newComment,
            date: new Date().toLocaleString(),
            id: '홍홍',
            replies: []
        };

        setReviewsComments([...reviewsComments, commentData]);
    };

    const addReviewReply = (parentIndex, replyText) => {
        const replyData = {
            text: replyText,
            date: new Date().toLocaleString(),
            id: '홍홍'
        };

        const updatedComments = reviewsComments.map((comment, index) => {
            if (index === parentIndex) {
                return {
                    ...comment,
                    replies: [...comment.replies, replyData]
                };
            }
            return comment;
        });

        setReviewsComments(updatedComments);
    };

    return (
        <ReviewContext.Provider value={{ reviews, addReview, reviewsComments, addReviewComment, addReviewReply }}>
            {children}
        </ReviewContext.Provider>
    );
};

export { ReviewContext, ReviewProvider };