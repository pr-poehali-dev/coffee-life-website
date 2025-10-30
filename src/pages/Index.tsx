import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !name || !phone) {
      toast.error('Заполните все поля');
      return;
    }
    toast.success(`Столик забронирован на ${selectedDate.toLocaleDateString()} в ${selectedTime} для ${guests} гостей`);
  };

  const menuItems = {
    coffee: [
      { name: 'Эспрессо', description: 'Классический итальянский кофе', price: '150 ₽' },
      { name: 'Капучино', description: 'Эспрессо с молочной пенкой', price: '200 ₽' },
      { name: 'Латте', description: 'Нежный кофе с молоком', price: '220 ₽' },
      { name: 'Флэт Уайт', description: 'Двойной эспрессо с бархатным молоком', price: '240 ₽' },
    ],
    tea: [
      { name: 'Зелёный чай', description: 'Освежающий китайский чай', price: '180 ₽' },
      { name: 'Чёрный чай', description: 'Классический английский завтрак', price: '180 ₽' },
      { name: 'Травяной чай', description: 'Успокаивающий ромашковый', price: '200 ₽' },
    ],
    desserts: [
      { name: 'Круассан', description: 'Французская выпечка', price: '150 ₽' },
      { name: 'Чизкейк', description: 'Нежный творожный десерт', price: '280 ₽' },
      { name: 'Брауни', description: 'Шоколадный пирог', price: '250 ₽' },
    ],
  };

  const events = [
    { date: '5 ноября', title: 'Джазовый вечер', description: 'Живая музыка от 19:00' },
    { date: '12 ноября', title: 'Кофейная дегустация', description: 'Мастер-класс по завариванию' },
    { date: '19 ноября', title: 'Поэтический вечер', description: 'Открытый микрофон' },
  ];

  const gallery = [
    'https://cdn.poehali.dev/projects/c50e81a8-bdd4-42d2-9289-08046892964e/files/d183b6a0-5818-4837-a6a7-c0487b08da4c.jpg',
    'https://cdn.poehali.dev/projects/c50e81a8-bdd4-42d2-9289-08046892964e/files/23cd3078-4225-4fc2-a2a5-abb4c4465c76.jpg',
    'https://cdn.poehali.dev/projects/c50e81a8-bdd4-42d2-9289-08046892964e/files/a79673f3-c9ef-4fa9-a0c0-2824456f68d1.jpg',
  ];

  const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">Жизнь с кофе</h1>
            <div className="hidden md:flex gap-8">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'menu', label: 'Меню' },
                { id: 'about', label: 'О нас' },
                { id: 'gallery', label: 'Галерея' },
                { id: 'events', label: 'События' },
                { id: 'contacts', label: 'Контакты' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Icon name="Calendar" className="mr-2" size={18} />
                  Бронировать
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Бронирование столика</DialogTitle>
                  <DialogDescription>Выберите дату, время и укажите количество гостей</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                  <div>
                    <Label htmlFor="guests">Количество гостей</Label>
                    <Input id="guests" type="number" min="1" max="10" value={guests} onChange={(e) => setGuests(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <Button className="w-full" onClick={handleBooking}>
                    Подтвердить бронирование
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-6xl font-bold text-primary leading-tight">Место, где жизнь обретает вкус</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Уютная атмосфера, ароматный кофе и моменты спокойствия в самом сердце города
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => scrollToSection('menu')} className="bg-primary hover:bg-primary/90">
                  <Icon name="Coffee" className="mr-2" size={20} />
                  Наше меню
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('about')}>
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="animate-fade-up">
              <img
                src="https://cdn.poehali.dev/projects/c50e81a8-bdd4-42d2-9289-08046892964e/files/d183b6a0-5818-4837-a6a7-c0487b08da4c.jpg"
                alt="Интерьер кофейни"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl font-bold text-primary mb-4">Меню</h2>
            <p className="text-xl text-muted-foreground">Тщательно отобранные напитки и десерты</p>
          </div>
          <Tabs defaultValue="coffee" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="coffee">
                <Icon name="Coffee" className="mr-2" size={18} />
                Кофе
              </TabsTrigger>
              <TabsTrigger value="tea">
                <Icon name="Cup" className="mr-2" size={18} />
                Чай
              </TabsTrigger>
              <TabsTrigger value="desserts">
                <Icon name="Cake" className="mr-2" size={18} />
                Десерты
              </TabsTrigger>
            </TabsList>
            {Object.entries(menuItems).map(([category, items]) => (
              <TabsContent key={category} value={category} className="space-y-4">
                {items.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl">{item.name}</CardTitle>
                          <CardDescription className="text-base mt-2">{item.description}</CardDescription>
                        </div>
                        <span className="text-2xl font-bold text-primary">{item.price}</span>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="animate-fade-in">
              <img
                src="https://cdn.poehali.dev/projects/c50e81a8-bdd4-42d2-9289-08046892964e/files/23cd3078-4225-4fc2-a2a5-abb4c4465c76.jpg"
                alt="Кофе"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="space-y-6 animate-fade-up">
              <h2 className="text-5xl font-bold text-primary">О нас</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                «Жизнь с кофе» — это больше, чем просто кофейня. Это место, где каждая чашка рассказывает историю, а каждый визит
                становится частью вашего дня.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Мы открылись в 2020 году с простой миссией: создать пространство спокойствия и вдохновения в городской суете. Наши
                бариста — настоящие мастера своего дела, использующие только отборные зёрна из этичных хозяйств.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">лет с вами</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15K+</div>
                  <div className="text-sm text-muted-foreground">счастливых гостей</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">30+</div>
                  <div className="text-sm text-muted-foreground">видов напитков</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl font-bold text-primary mb-4">Галерея</h2>
            <p className="text-xl text-muted-foreground">Атмосфера нашей кофейни</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {gallery.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
                <img src={image} alt={`Галерея ${index + 1}`} className="w-full h-80 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl font-bold text-primary mb-4">События</h2>
            <p className="text-xl text-muted-foreground">Культурная программа в нашей кофейне</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {events.map((event, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name="Calendar" className="text-primary" size={24} />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{event.date}</span>
                  </div>
                  <CardTitle className="text-2xl">{event.title}</CardTitle>
                  <CardDescription className="text-base mt-2">{event.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl font-bold text-primary mb-4">Контакты</h2>
            <p className="text-xl text-muted-foreground">Приходите к нам в гости</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl mb-6">Напишите нам</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Имя</Label>
                    <Input id="contact-name" placeholder="Ваше имя" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea id="message" placeholder="Ваше сообщение..." rows={4} />
                  </div>
                  <Button className="w-full" type="button" onClick={() => toast.success('Сообщение отправлено!')}>
                    Отправить
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Icon name="MapPin" className="text-primary mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                      <p className="text-muted-foreground">ул. Примерная, 123, Москва</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 mb-4">
                    <Icon name="Phone" className="text-primary mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 mb-4">
                    <Icon name="Clock" className="text-primary mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Часы работы</h3>
                      <p className="text-muted-foreground">Пн-Пт: 8:00 - 22:00</p>
                      <p className="text-muted-foreground">Сб-Вс: 9:00 - 23:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Mail" className="text-primary mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-muted-foreground">info@life-coffee.ru</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12 px-6">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Жизнь с кофе</h3>
          <p className="text-primary-foreground/80 mb-6">Каждый день — новая история вкуса</p>
          <div className="flex justify-center gap-6">
            <Icon name="Instagram" className="cursor-pointer hover:scale-110 transition-transform" size={24} />
            <Icon name="Facebook" className="cursor-pointer hover:scale-110 transition-transform" size={24} />
            <Icon name="Twitter" className="cursor-pointer hover:scale-110 transition-transform" size={24} />
          </div>
          <div className="mt-8 pt-8 border-t border-primary-foreground/20">
            <p className="text-sm text-primary-foreground/60">© 2024 Жизнь с кофе. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
