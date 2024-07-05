import React, { createContext, useContext, useState } from 'react';

const ListContext = createContext();
export const useListContext = () => {
    return useContext(ListContext);
}

const mockadoption = [
    {
        id: 1,
        type: "Adopt",
        dogName: "해피",
        species: "믹스견",
        nickName: "해피맘",
        age: "3",
        period: "8",
        text: "안녕하세요. 해피를 3개월 동안 임시 보호하고 있는 임시 보호자 입니다. 저희 해피는 사진에서 보시는 것처럼 밝고, 잘 웃습니다. 그래서 해피가 주는 기쁨만큼 해피에게 과거에 행복했고 사랑받았던 일을 기억하게 해주고 싶습니다. 아래는 해피의 ai 분석 결과입니다. 그 결과는 아래에서 확인할 수 있습니다. 해피에게 행복한 일상을 선물해줄 주인을 기다립니다. ",
        phone: "010-1564-4567",
        tnr: true,
        update: "2024.03.19",
        img: ["https://img.freepik.com/free-photo/cute-shiba-inu-pet-with-family_23-2149428910.jpg?t=st=1720115303~exp=1720118903~hmac=8348b94946f3b4558f9c0ba56c06f61c86bb2486d2928154d4aba9b3af0c9590&w=1800",
            "https://img.freepik.com/free-photo/cute-shiba-inu-pet-with-family_23-2149428895.jpg?t=st=1720115370~exp=1720118970~hmac=7567652697135e2567aa9d934026ddb6ae66ae858c8d46b6491b7033c129254a&w=1800",
            "https://img.freepik.com/free-photo/adorable-shiba-inu-dog-indoors_23-2148991912.jpg?t=st=1720115406~exp=1720119006~hmac=d6c271f2c2ebfad127ddbb6ead167fec69b3143a552c1e5ccfdfd133c143aeb5&w=740"
        ]
        
    },
    {
        id: 2,
        type: "Adopt",
        dogName: "하루",
        species: "믹스견",
        nickName: "sss",
        age: " 2",
        period: "3",
        text: "안녕하세요. 해피를 3개월 동안 임시 보호하고 있는 임시 보호자 입니다. 저희 해피는 사진에서 보시는 것처럼 밝고, 잘 웃습니다. 그래서 해피가 주는 기쁨만큼 해피에게 과거에 행복했고 사랑받았던 일을 기억하게 해주고 싶습니다. 아래는 해피의 ai 분석 결과입니다. 그 결과는 아래에서 확인할 수 있습니다. 해피에게 행복한 일상을 선물해줄 주인을 기다립니다. ",
        phone: "3",
        tnr: false,
        update: "2024.03.19",
        img: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN6gBbOavmtzhLdRPGjsqHXJLnlhHeodOfVYKqxM5bZsnkVoTqChOs87rtmIGmyfRqY_c&usqp=CAU",
            "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
            "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg"
        ]
    },
    {
        id: 3,
        type: "Adopt",
        dogName: "후추",
        species: "믹스견",
        nickName: "후추구름",
        age: "4",
        period: "7",
        text: "안녕하세요. 해피를 3개월 동안 임시 보호하고 있는 임시 보호자 입니다. 저희 해피는 사진에서 보시는 것처럼 밝고, 잘 웃습니다. 그래서 해피가 주는 기쁨만큼 해피에게 과거에 행복했고 사랑받았던 일을 기억하게 해주고 싶습니다. 아래는 해피의 ai 분석 결과입니다. 그 결과는 아래에서 확인할 수 있습니다. 해피에게 행복한 일상을 선물해줄 주인을 기다립니다. ",
        phone: "3",
        tnr: false,
        update: "2024.03.19",
        img: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUM0YesDQcJmSs7PktpoFejWQ_E9arhafDQWjP2QApJfUR0qtjnoUaL4mDtY9bflU8LSY&usqp=CAU",
            "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
            "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg"
        ]
    },
    {
        id: 4,
        type: "Adopt",
        dogName: "꼬질이",
        species: "믹스견",
        nickName: "꼬질이맘",
        age: "5",
        period: "1",
        text: "안녕하세요. 해피를 3개월 동안 임시 보호하고 있는 임시 보호자 입니다. 저희 해피는 사진에서 보시는 것처럼 밝고, 잘 웃습니다. 그래서 해피가 주는 기쁨만큼 해피에게 과거에 행복했고 사랑받았던 일을 기억하게 해주고 싶습니다. 아래는 해피의 ai 분석 결과입니다. 그 결과는 아래에서 확인할 수 있습니다. 해피에게 행복한 일상을 선물해줄 주인을 기다립니다. ",
        phone: "3",
        tnr: true,
        update: "2024.03.19",
        img: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-L_o-u3pMZxq82zaNIQleazQEdsnHpANITSZaKzLina4--Mnm5c9nXFhZgo9T12lz2A&usqp=CAU",
            "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
            "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg"
        ]
    },
    {
        id: 5,
        type: "Adopt",
        dogName: "구름이",
        species: "믹스견",
        nickName: "후추구름",
        age: "3",
        period: "6",
        text: "안녕하세요. 해피를 3개월 동안 임시 보호하고 있는 임시 보호자 입니다. 저희 해피는 사진에서 보시는 것처럼 밝고, 잘 웃습니다. 그래서 해피가 주는 기쁨만큼 해피에게 과거에 행복했고 사랑받았던 일을 기억하게 해주고 싶습니다. 아래는 해피의 ai 분석 결과입니다. 그 결과는 아래에서 확인할 수 있습니다. 해피에게 행복한 일상을 선물해줄 주인을 기다립니다. ",
        phone: "3",
        tnr: true,
        update: "2024.03.19",
        img: ["https://images.mypetlife.co.kr/content/uploads/2022/04/20101054/IMG_4564-1-edited-scaled.jpg",
            "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
            "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
            "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg"
        ]
    },
    {
        id: 6,
        type: "Adopt",
        dogName: "사탕이",
        species: "믹스견",
        nickName: "해피맘",
        age: "1",
        period: "3",
        text: "안녕하세요. 해피를 3개월 동안 임시 보호하고 있는 임시 보호자 입니다. 저희 해피는 사진에서 보시는 것처럼 밝고, 잘 웃습니다. 그래서 해피가 주는 기쁨만큼 해피에게 과거에 행복했고 사랑받았던 일을 기억하게 해주고 싶습니다. 아래는 해피의 ai 분석 결과입니다. 그 결과는 아래에서 확인할 수 있습니다. 해피에게 행복한 일상을 선물해줄 주인을 기다립니다. ",
        phone: "3",
        tnr: false,
        update: "2024.03.19",
        img: ["https://image.dongascience.com/Photo/2018/01/15159739972169[1].jpg",
            "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
            "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg"
        ]
    }
];

const mockShelter = [
    {
        id: 1,
        type: "Shelter",
        dogName: "햇빛이",
        species: "믹스견",
        age: "1",
        shelterName: "하늘 보호소",
        phone: "02-1234-5678",
        tnr: true,
        update: "2024.03.19",
        text: "안녕하세요. 하늘 보호소 입니다.  햇빛이는 생후 한 달 정도의 나이로 추정됩니다. 햇빛이는 매우 활기차고, 호기심 많은 성격을 지니고 있고, 놀이와 탐험을 사랑하며, 새로운 것을 배우는 것에 열정적입니다. 햇빛이는 어리기 때문에 훈련과 애정을 통해 더 나은 반려견이 될 준비가 되어 있습니다. 햇빛이와 함께 하며 많은 행복을 경험하시길 바랍니다.",
        img: ["https://kcanimal.or.kr/file_data/board_gallery01/202405/240525121757.jpg",
            "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
            "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg"
        ]
    },
    {
        id: 2,
        type: "Shelter",
        dogName: "쿠키",
        species: "믹스견",
        age: "2",
        shelterName: "늘 보호소",
        phone: "3",
        tnr: false,
        update: "2024.03.19",
        text: "안녕하세요. 하늘 보호소 입니다.  햇빛이는 생후 한 달 정도의 나이로 추정됩니다. 햇빛이는 매우 활기차고, 호기심 많은 성격을 지니고 있고, 놀이와 탐험을 사랑하며, 새로운 것을 배우는 것에 열정적입니다. 햇빛이는 어리기 때문에 훈련과 애정을 통해 더 나은 반려견이 될 준비가 되어 있습니다. 햇빛이와 함께 하며 많은 행복을 경험하시길 바랍니다.",
        img: ["https://petnolza.com/wp-content/uploads/2023/08/dog-2023-Poodle.jpg",
            "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
            "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg"
        ]
    },
    {
        id: 3,
        type: "Shelter",
        dogName: "코코아",
        species: "믹스견",
        age: "1",
        shelterName: "사 보호소",
        phone: "3",
        tnr: true,
        update: "2024.03.19",
        text: "안녕하세요. 하늘 보호소 입니다.  햇빛이는 생후 한 달 정도의 나이로 추정됩니다. 햇빛이는 매우 활기차고, 호기심 많은 성격을 지니고 있고, 놀이와 탐험을 사랑하며, 새로운 것을 배우는 것에 열정적입니다. 햇빛이는 어리기 때문에 훈련과 애정을 통해 더 나은 반려견이 될 준비가 되어 있습니다. 햇빛이와 함께 하며 많은 행복을 경험하시길 바랍니다.",
        img: ["https://img4.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202209/24/bemypet/20220924140051262nqik.jpg",
            "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
            "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg"
        ]
    },
    {
        id: 4,
        type: "Shelter",
        dogName: "절미",
        species: "믹스견",
        age: "4",
        shelterName: "산 보호소",
        phone: "3",
        tnr: true,
        update: "2024.03.19",
        text: "안녕하세요. 하늘 보호소 입니다.  햇빛이는 생후 한 달 정도의 나이로 추정됩니다. 햇빛이는 매우 활기차고, 호기심 많은 성격을 지니고 있고, 놀이와 탐험을 사랑하며, 새로운 것을 배우는 것에 열정적입니다. 햇빛이는 어리기 때문에 훈련과 애정을 통해 더 나은 반려견이 될 준비가 되어 있습니다. 햇빛이와 함께 하며 많은 행복을 경험하시길 바랍니다.",
        img: ["https://blog.kakaocdn.net/dn/wQPkr/btrMkHnJfHU/NxkUDbJqFAKM2e9q2riRKK/img.jpg",
            "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
            "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg"
        ]
    },
    {
        id: 5,
        type: "Shelter",
        dogName: "별이",
        species: "믹스견",
        age: "5",
        shelterName: "랑 보호소",
        phone: "3",
        tnr: true,
        update: "2024.03.19",
        text: "안녕하세요. 하늘 보호소 입니다.  햇빛이는 생후 한 달 정도의 나이로 추정됩니다. 햇빛이는 매우 활기차고, 호기심 많은 성격을 지니고 있고, 놀이와 탐험을 사랑하며, 새로운 것을 배우는 것에 열정적입니다. 햇빛이는 어리기 때문에 훈련과 애정을 통해 더 나은 반려견이 될 준비가 되어 있습니다. 햇빛이와 함께 하며 많은 행복을 경험하시길 바랍니다.",
        img: ["https://contents-cdn.viewus.co.kr/image/2024/03/CP-2023-0092/image-f3fee0ed-bf68-49fe-b1fd-0436b1f715a2.jpeg",
            "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
            "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg"
        ]
    },
    {
        id: 6,
        type: "Shelter",
        dogName: "사랑이",
        species: "믹스견",
        age: "9",
        shelterName: "바다 보호소",
        phone: "3",
        tnr: false,
        update: "2024.03.19",
        text: "안녕하세요. 하늘 보호소 입니다.  햇빛이는 생후 한 달 정도의 나이로 추정됩니다. 햇빛이는 매우 활기차고, 호기심 많은 성격을 지니고 있고, 놀이와 탐험을 사랑하며, 새로운 것을 배우는 것에 열정적입니다. 햇빛이는 어리기 때문에 훈련과 애정을 통해 더 나은 반려견이 될 준비가 되어 있습니다. 햇빛이와 함께 하며 많은 행복을 경험하시길 바랍니다.",
        img: ["https://cdn.bizwatch.co.kr/news/index/2023/09/22/fa65ca286bfc029ffacb9c81925a2342.jpeg",
            "https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg",
            "https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg"
        ]
    }
];

const mockListComments = [
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

const ListProvider = ({ children }) => {
    const [adoptList, setAdoptList] = useState(mockadoption);
    const [shelterList, setShelterList] = useState(mockShelter);
    const [listComments, setListComments] = useState(mockListComments);

    const addList = (newList, type) => {
        if (type === 'Adopt') {
            setAdoptList([...adoptList, newList]);
        } 
    };

    const addListComment = (newComment) => {
        const commentData = {
            ...newComment,
            date: new Date().toLocaleString(),
            id: '홍홍',
            replies: []
        };

        setListComments([...listComments, commentData]);
    };

    const addListReply = (parentIndex, replyText) => {
        const replyData = {
            text: replyText,
            date: new Date().toLocaleString(),
            id: '홍홍'
        };

        const updatedComments = listComments.map((comment, index) => {
            if (index === parentIndex) {
                return {
                    ...comment,
                    replies: [...comment.replies, replyData]
                };
            }
            return comment;
        });

        setListComments(updatedComments);
    };

    const updateAdoptionStatus = (id, isAdopted) => {
        setAdoptList((prevList) =>
            prevList.map(item =>
                item.id === id ? { ...item, isAdopted } : item
            )
        );
        setShelterList((prevList) =>
            prevList.map(item =>
                item.id === id ? { ...item, isAdopted } : item
            )
        );
    };

    return (
        <ListContext.Provider value={{ adoptList, shelterList, addList, listComments, addListComment, addListReply, updateAdoptionStatus }}>
            {children}
        </ListContext.Provider>
    );
};

export { ListContext, ListProvider };