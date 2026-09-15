'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { Faq } from '@/lib/types';
export function FaqList({ items }: { items: Faq[] }) { const [active, setActive] = useState(0); return <div className="faq-list">{items.map((item, i) => <div className={`faq-item ${active === i ? 'active' : ''}`} key={item.question}><button onClick={() => setActive(active === i ? -1 : i)} aria-expanded={active === i}><span>{item.question}</span>{active === i ? <Minus size={18} /> : <Plus size={18} />}</button>{active === i && <p>{item.answer}</p>}</div>)}</div>; }
