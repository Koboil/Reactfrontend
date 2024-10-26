'use client';
import { List, Row } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils';
import ServiceCard from '@/components/Service/ServiceCard';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useServicesJsonLdQuery } from '@/services/serviceApi';
import { Service } from '@/models';

export default function Services() {
   const loadMoreRef = useRef(null);
   const [searchInput, setSearchInput] = useState('');
   const [query, setQuery] = useState<any>({
      'order[createdAt]': 'desc',
      isActive: true,
      itemsPerPage: 10,
   });

   const { data: services, isLoading } = useServicesJsonLdQuery(query);
   const [list, setList] = useState<Service[]>([]);
   const [canLoadMore, setCanLoadMore] = useState(false);

   useEffect(() => {
      if (services) {
         const data = services['hydra:member'];
         setList((prevState) => [...prevState, ...data]);
         setCanLoadMore(!!services['hydra:view']?.['hydra:next']);
      }
   }, [services]);

   const onLoadMore = useCallback(() => {
      if (!canLoadMore) return;
      setQuery((prevState) => ({
         ...prevState,
         page: prevState.page ? prevState.page + 1 : 2,
      }));
      setCanLoadMore(false);
   }, [canLoadMore]);

   useEffect(() => {
      if (isLoading) return;

      const observer = new IntersectionObserver(
         (entries) => {
            if (entries[0].isIntersecting) onLoadMore();
         },
         { threshold: 1.0 },
      );

      const currentRef = loadMoreRef.current;
      if (currentRef) observer.observe(currentRef);

      return () => currentRef && observer.unobserve(currentRef);
   }, [isLoading, onLoadMore]);

   const handleSearch = () => {
      setList([]);
      setQuery((prev) => ({
         ...prev,
         search: searchInput,
         page: 1,
      }));
   };

   const renderItem = (item: Service, index: number) => (
      <div className="m-3" ref={index === list.length - 3 ? loadMoreRef : null}>
         <ServiceCard data={item} />
      </div>
   );

   return (
      <>
         <section className="relative z-[1] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-left mb-3">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                     Découvrez les services proposés sur CoachApp
                  </h2>
                  <p className="mt-3 text-lg text-gray-500 sm:mt-4">
                     Trouvez le service qui vous convient et réservez en un seul clic.
                  </p>
               </div>
               <div className="flex justify-end items-center mb-20">
                  <div className="flex-2 flex items-center space-x-2">
                     <input
                        type="text"
                        placeholder="Rechercher un service"
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
               />
            </div>
         </section>
      </>
   );
}
