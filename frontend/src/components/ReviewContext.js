import React, { createContext, useContext, useState } from 'react';

const ReviewContext = createContext();
export const useReviewContext = () => {
    return useContext(ReviewContext);
}

const mockReview = [
    {
        id: 1,
        nickName: "f",
        update: "2024.03.19",
        content: "유기견 입양 후기 내영1",
        img: [
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            "https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            "https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
        ]
    },
    {
        id: 5,
        nickName: "fss",
        update: "2024.03.19",
        content: "유기견 입양 후기 내영1",
        img: [ "https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
            "https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            
           
        ]
    },
    {
        id: 2,
        nickName: "s",
        update: "2024.09.15",
        content: "유기견 입양 후기 내영2",
        img: ["https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            
            "https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
        ]
    },
    {
        id: 3,
        nickName: "t",
        update: "2024.06.15",
        content: "유기견 입양 후기 내영3",
        img: ["https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            "https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            
        ]
    },
    {
        id: 4,
        nickName: "fe",
        update: "2024.03.21",
        content: "유기견을 입양한 것은 정말 큰 축복이었습니다. 그는 우리의 가족에게 무한한 사랑과 즐거움을 줍니다. 우리는 그를 더 많은 사랑으로 감싸고, 그의 행복을 위해 노력할 것입니다.",
        img: [ "https://flexible.img.hani.co.kr/flexible/normal/960/960/imgdb/resize/2019/0121/00501111_20190121.JPG",
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
           "https://m.segye.com/content/image/2022/05/23/20220523519355.jpg",
            "https://shop.peopet.co.kr/data/goods/388/2022/06/_temp_16557127733930view.jpg",
            "https://cdn.mkhealth.co.kr/news/photo/202108/54607_56591_5215.jpg",
        ]
    },
]

const mockReivewComments = [
    {
        id: 'HANA21',
        text: '해피에 대해서 더 궁금한게 있는데 연락드려도 될까요?',
        date: '2024.04.02.9:12',
        isSecret: false,
        replies: []
    },
    {
        id: '초이PARK',
        text: '해피 ~',
        date: '2024.04.01.10:07',
        isSecret: false,
        replies: []
    }
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
            id: 'test',
            replies: []
        };

        setReviewsComments([...reviewsComments, commentData]);
    };

    const addReviewReply = (parentIndex, replyText) => {
        const replyData = {
            text: replyText,
            date: new Date().toLocaleString(),
            id: 'test'
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