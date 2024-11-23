import { Footer } from "./footer";
import { Nav } from "./nav";

export function PageWrapper({ children }: { children: React.ReactNode }) {
 return (
  <div className='min-h-screen flex flex-col'>
   <Nav />
   <main className='flex-1 pb-4'>{children}</main>
   <Footer />
  </div>
 );
}
