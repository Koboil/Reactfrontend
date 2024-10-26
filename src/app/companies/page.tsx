'use client';
import { Col, Row, Card, List } from 'antd';
import { cn } from '@/utils';
import Image from 'next/image';
import { Pages } from '@/config/constant';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import { LoadingOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Service } from '@/models';
import ServiceCard from '@/components/Service/ServiceCard';
import { useCompaniesJsonLdQuery } from '@/services/companyApi';

export default function Companies() {
   const loadMoreRef = useRef(null);
   const [query, setQuery] = useState<any>({
      'order[createdAt]': 'desc',
      isActive: true,
      itemsPerPage: 10,
   });
   const { data: companies, isLoading } = useCompaniesJsonLdQuery(query);

   const [canLoadMore, setCanLoadMore] = useState(false);

   const [list, setList] = useState<Service[]>([]);

   useEffect(() => {
      if (companies) {
         const data = companies['hydra:member' as unknown as keyof typeof companies];
         setList((prevState) => [...prevState, ...data]);
         if (
            companies['hydra:view' as unknown as keyof typeof companies] &&
            companies['hydra:view' as unknown as keyof typeof companies]['hydra:next']
         ) {
            // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
            // In real scene, you can using public method of react-virtualized:
            // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
            window.dispatchEvent(new Event('resize'));
            setCanLoadMore(true);
         } else {
            setCanLoadMore(false);
         }
      }
   }, [companies, setList, setCanLoadMore]);

   const onLoadMore = useCallback(() => {
      if (!canLoadMore) {
         return;
      }
      setQuery((prevState: any) => ({
         ...prevState,
         page: prevState.page ? prevState.page + 1 : 2,
      }));
      setCanLoadMore(false);
   }, [canLoadMore, setQuery]);

   useEffect(() => {
      if (isLoading) {
         return;
      }

      const observer = new IntersectionObserver(
         (entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
               onLoadMore();
            }
         },
         { threshold: 1.0 },
      );

      const currentRef = loadMoreRef.current;

      if (currentRef) {
         observer.observe(currentRef);
      }

      return () => {
         if (currentRef) {
            observer.unobserve(currentRef);
         }
      };
   }, [isLoading, loadMoreRef, onLoadMore]);

   const [searchInput, setSearchInput] = useState('');
   // const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
   //    setList([]);
   //    setQuery((prev: any) => {
   //       const { search, prevState, ...rest } = prev;
   //       if (searchInput) {
   //          return { ...rest, search: searchInput };
   //       } else {
   //          return { ...rest };
   //       }
   //    });
   // };

   const handleSearch = () => {
      setList([]);
      setQuery((prev) => ({
         ...prev,
         search: searchInput,
         page: 1,
      }));
   };

   const renderItem = (item: any, index: number) => {
      const addRef = list?.length > 1 && index === list?.length - 3 ? true : false;

      return (
         <div className="m-3" ref={addRef ? loadMoreRef : null}>
            <Card hoverable>
               <a href={`${Pages.COMPANIES}/${item.id}`}>
                  <div className="flex items-center">
                     <div className="mr-2 w-100 h-100 bg-slate-100">
                        <Image
                           src={item?.logo ?? '/assets/img/m-logo.jpg'}
                           className="rounded"
                           alt={item?.name}
                           width={90}
                           height={90}
                        />
                     </div>
                     <div className="text-start">
                        <h3 className="text-lg font-bold">
                           {item?.name}
                           <span className="text-sm text-gray-500">
                              {' '}
                              ({item?.services})
                           </span>
                        </h3>
                        <p className="text-sm text-gray-500">{item?.categorie}</p>
                        <p className="text-sm text-gray-500">{item?.line1}</p>
                     </div>
                  </div>
               </a>
            </Card>
         </div>
      );
   };

   return (
      <>
         <section className="relative z-[1] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-left mb-3">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                     Tous les prestataires sur CoachApp
                  </h2>
                  <p className="mt-3 text-lg text-gray-500 sm:mt-4">
                     Trouvez le prestataire qui vous convient et réservez en un seul clic.
                  </p>
               </div>

               <div className="flex justify-end items-center">
                  <div className="flex-2 flex items-center space-x-2">
                     <input
                        type="text"
                        placeholder="Rechercher un prestataire"
                        className="p-2 border border-gray-300 rounded-md"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                     />
                     <button
                        className="bg-indigo-600 text-white p-2 rounded-md"
                        onClick={handleSearch}
                     >
                        <MagnifyingGlassIcon className="w-6 h-6" />
                     </button>
                  </div>
               </div>

               <List
                  className={cn('mt-20')}
                  grid={{ gutter: 16, column: 4 }}
                  loading={isLoading}
                  itemLayout="vertical"
                  dataSource={list}
                  renderItem={(item, index) => renderItem(item, index)}
                  // footer={isLoading && <LoadingOutlined style={{ fontSize: 40 }} />}
               />
            </div>
            {/*
            <Row>
               <Col span={24} className={cn('text-center mt-10')}>
                  <LoadingOutlined style={{ fontSize: 40 }} />
               </Col>
            </Row>*/}
         </section>
      </>
   );
}
