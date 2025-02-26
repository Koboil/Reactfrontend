import Icon from '@ant-design/icons';

const StarSvg = ({
   width = 26,
   height = 24,
   ...props
}: React.SVGProps<SVGSVGElement>) => {
   return (
      <svg
         width={width}
         height={height}
         viewBox="0 0 26 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path
            d="M25.2474 9.1713H15.6018L12.6325 0L9.64568 9.1713L0 9.15373L7.80088 14.8287L4.81405 24L12.6149 18.325L20.4158 24L17.4466 14.8287L25.2474 9.1713Z"
            fill="currentColor"
         />
         <path
            d="M18.1145 16.9023L17.4469 14.8291L12.6328 18.3254L18.1145 16.9023Z"
            fill="#005128"
         />
      </svg>
   );
};
const StarIcon = (props) => <Icon component={StarSvg} {...props} />;

export default StarIcon;
