import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';
import { Suspense } from 'react';

export const metadata = {
    title: 'Promptopia',
    description: 'Discover & Share AI Prompts',
}

const RootLayout = ({ children }) => {
  return (
    <html>
        <body>
            {/* @ts-ignore */}
            <Provider>
                <div className="main">
                    <div className='gradient' />
                </div>

                
                <main className='app'>
                    <Nav />
                    <Suspense fallback={<div>Loading...</div>}>
                        { children }
                    </Suspense>
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;