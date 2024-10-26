import React, { MutableRefObject } from 'react';
import { Avatar, Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Pages } from '@/config/constant';
import { cn, truncate } from '@/utils';
import { StarFilled } from '@ant-design/icons';
import { Service } from '@/models';

const { Meta } = Card;

interface ServiceCardProps {
   data: Service;
   ref?: MutableRefObject<null> | null;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ data, ref }) => {
   const { image: coverImage, name, company, description, id } = data;
   return (
      <>
         <Link href={`${Pages.SERVICES}/${id}`}>
            <Card
               ref={ref}
               hoverable={true}
               cover={
                  <Image
                     alt="example"
                     src={
                        coverImage ? coverImage?.contentUrl : '/assets/img/service-1.jpg'
                     }
                     width={200}
                     height={48}
                  />
               }
            >
               <Meta
                  className={cn(
                     'flex items-center border-b border-gray-200 bg-gray-50 mx-0 py-2',
                  )}
                  avatar={
                     <Avatar
                        src={
                           company?.logo
                              ? company?.logo?.contentUrl
                              : '/assets/img/digital-rit.png'
                        }
                        style={{ width: 40, height: 40 }}
                     />
                  }
                  title={name ? name : ''}
               />
               <Meta
                  style={{ marginTop: 10, fontSize: 15 }}
                  description={description ? truncate(description) : ''}
               />

               <Meta
                  style={{ marginTop: 10, fontSize: 15 }}
                  avatar={<StarFilled style={{ color: '#222' }} />}
                  description={4}
               />
            </Card>
         </Link>
      </>
   );
};

export default ServiceCard;
