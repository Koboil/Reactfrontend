import Link from 'next/link';
import { Pages } from '@/config/constant';

type BreadcrumbProps = {
   title: string;
   image?: string;
   navs?: Array<{
      name: string;
      link?: string;
      target?: string;
   }>;
};
const Breadcrumb = ({ title, navs }: BreadcrumbProps) => {
   return (
      <section className="section-breadcrumb">
         <div className="breadcrumb-wrapper">
            <div className="container-default">
               <div className="breadcrumb-block">
                  <h1 className="breadcrumb-title">{title}</h1>
                  <ul className="breadcrumb-nav">
                     {navs &&
                        navs.map((item) => {
                           return (
                              <li key={item.name}>
                                 {item.link ? (
                                    <Link href={item.link}>{item.name}</Link>
                                 ) : (
                                    item.name
                                 )}
                              </li>
                           );
                        })}
                     {!navs && (
                        <>
                           <li>
                              <Link href={Pages.HOME}>Accueil</Link>
                           </li>
                           <li>{title}</li>
                        </>
                     )}
                  </ul>
               </div>
            </div>

            <div className="absolute left-0 top-0 -z-10">
               <img
                  src="/assets/img/elements/breadcrumb-shape-1.svg"
                  alt="hero-shape-1"
                  width="291"
                  height="380"
               />
            </div>

            <div className="absolute bottom-0 right-0 -z-[1]">
               <img
                  src="/assets/img/elements/breadcrumb-shape-2.svg"
                  alt="hero-shape-2"
                  width="291"
                  height="380"
               />
            </div>
         </div>
      </section>
   );
};
export default Breadcrumb;
