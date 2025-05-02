'use client';

import { Container, Template, Title } from "@/components";
import { useState } from "react";
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css"; // Importa o CSS padrão
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: '500' });

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calendars() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <Template>
      <Title>
        Calendar
      </Title>
      <Container> {/* Container ocupa a tela inteira */}
        <div className="w-full h-full flex items-center justify-center"> {/* Alinha o calendário ao centro */}
          <Calendar
            onChange={onChange}
            value={value}
            className={`w-full h-full text-2xl ${roboto.className}`}
            locale="en-US"
          />
        </div>
      </Container>
    </Template>
  );
}
