import * as react_jsx_runtime from 'react/jsx-runtime';
import React$1 from 'react';

declare function Button({ children }: {
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function ButtonDeep(): react_jsx_runtime.JSX.Element;

interface ItemProps {
    imageUrl: string;
    name: string;
    requestDate?: Date;
    actions?: React$1.ReactNode;
}
declare function Item({ imageUrl, name, requestDate, actions }: ItemProps): react_jsx_runtime.JSX.Element;

interface BookSmProps {
    title: string;
    imageUrl: string;
    altText?: string;
}
interface BookLgProps {
    imageUrl: string;
    title: string;
    altText?: string;
}
interface BookMdProps {
    imageUrl: string;
    answerTitle: string;
    answerText: string;
    altText?: string;
}
interface BookMdQuestionProps {
    imageUrl: string;
    title: string;
    question: string;
    altText?: string;
}
interface BookMdMetaProps {
    imageUrl: string;
    title: string;
    author: string;
    publisher: string;
    publicationDate: string;
    altText?: string;
}
declare function BookSm({ title, imageUrl, altText }: BookSmProps): react_jsx_runtime.JSX.Element;
declare function BookMdQuestion({ imageUrl, title, question, altText, }: BookMdQuestionProps): react_jsx_runtime.JSX.Element;
declare function BookMdAnswer({ imageUrl, answerTitle, answerText, altText, }: BookMdProps): react_jsx_runtime.JSX.Element;
declare function BookMdMeta({ imageUrl, title, author, publisher, publicationDate, // Expects YYYYMMDD format for formatting logic
altText, }: BookMdMetaProps): react_jsx_runtime.JSX.Element;
declare function BookLg({ imageUrl, title, altText }: BookLgProps): react_jsx_runtime.JSX.Element;
declare function BookLgBordered({ imageUrl, title, altText }: BookLgProps): react_jsx_runtime.JSX.Element;
declare function BookXl({ imageUrl, title, altText }: BookLgProps): react_jsx_runtime.JSX.Element;

interface ProfileBaseProps {
    imageUrl: string;
    name: string;
    altText?: string;
}
interface ProfileLgProps extends ProfileBaseProps {
    bio: string;
}
interface ProfileSmAnswerProps extends ProfileBaseProps {
    answerTitle: string;
    answerText: string;
}
declare function ProfileSm({ imageUrl, name, altText }: ProfileBaseProps): react_jsx_runtime.JSX.Element;
declare function ProfileSmIndex({ imageUrl, name, altText }: ProfileBaseProps): react_jsx_runtime.JSX.Element;
declare function ProfileSmAnswer({ imageUrl, name, altText, answerTitle, answerText, }: ProfileSmAnswerProps): react_jsx_runtime.JSX.Element;
declare function ProfileMd({ imageUrl, name, altText }: ProfileBaseProps): react_jsx_runtime.JSX.Element;
declare function ProfileMdBordered({ imageUrl, name, altText, }: ProfileBaseProps): react_jsx_runtime.JSX.Element;
declare function ProfileLg({ imageUrl, name, bio, altText }: ProfileLgProps): react_jsx_runtime.JSX.Element;

declare function IndexBack({ back }: {
    back?: string;
}): react_jsx_runtime.JSX.Element;
declare function IndexForward({ forward }: {
    forward?: string;
}): react_jsx_runtime.JSX.Element;
declare function IndexTop({ profile }: {
    profile: ProfileBaseProps;
}): react_jsx_runtime.JSX.Element;
declare function IndexTopBack({ back, title, book, profile, totalPages, currentPage, }: {
    back?: string;
    title: string;
    book?: BookSmProps;
    profile?: ProfileBaseProps;
    totalPages?: number;
    currentPage?: number;
}): react_jsx_runtime.JSX.Element;
declare function IndexBottom({ back, forward, }: {
    back?: string;
    forward?: string;
}): react_jsx_runtime.JSX.Element;
declare function IndexBottomButton({ back, forward, }: {
    back?: string;
    forward?: string;
}): react_jsx_runtime.JSX.Element;

interface SoulProfileProps {
    imageUrl: string;
    name: string;
    altText?: string;
}

interface AnswerProps {
    answer: {
        title: string;
        answer_text: string;
    };
    book: {
        imageUrl: string;
        title: string;
        altText?: string;
    };
    questionText: string;
    formattedDate: string;
}
declare const Answer: React$1.FC<AnswerProps>;

export { Answer, BookLg, BookLgBordered, BookMdAnswer, BookMdMeta, BookMdQuestion, BookSm, type BookSmProps, BookXl, Button, ButtonDeep, IndexBack, IndexBottom, IndexBottomButton, IndexForward, IndexTop, IndexTopBack, Item, type ItemProps, type ProfileBaseProps, ProfileLg, ProfileMd, ProfileMdBordered, ProfileSm, ProfileSmAnswer, ProfileSmIndex, type SoulProfileProps };
