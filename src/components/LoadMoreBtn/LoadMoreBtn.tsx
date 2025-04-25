import css from './LoadMoreBtn.module.css'
interface Props {
    onClick: () => void;
}

const LoadMoreBtn = ({ onClick }: Props) =>{
    return <button className={css.btn} onClick={onClick}>Load more</button>
}
export default LoadMoreBtn;