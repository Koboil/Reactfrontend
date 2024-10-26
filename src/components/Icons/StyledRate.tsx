import StarIcon from '@/components/icons/Star';
import styled from 'styled-components';
import { Rate } from 'antd';
import { RateProps } from 'antd/es/rate';

const CustomRate = styled(Rate)`
   .ant-rate-star svg {
      width: 26px;
      height: 24px;
   }

   .ant-rate-star-full svg {
      color: #00b67a;
   }

   .ant-rate-star-half svg {
      color: #00b67a;
   }

   .ant-rate-star-zero svg {
      color: #f0f0f0;
   }
`;

const StyledRate = (props: RateProps) => {
   return <CustomRate character={<StarIcon />} {...props} />;
};
export default StyledRate;
