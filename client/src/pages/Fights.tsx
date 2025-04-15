import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";

export default function Fights() {
  const [tab, setTab] = useState("upcoming");
  
  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      name: "UFC 321: Edwards vs. Muhammad",
      date: "Apr 27, 2025",
      venue: "T-Mobile Arena, Las Vegas, NV",
      mainCard: [
        { id: 1, fighter1: "Leon Edwards", fighter2: "Belal Muhammad", title: "Welterweight Championship", isMain: true },
        { id: 2, fighter1: "Sean O'Malley", fighter2: "Merab Dvalishvili", title: "Bantamweight Championship" },
        { id: 3, fighter1: "Weili Zhang", fighter2: "Yan Xiaonan", title: "Women's Strawweight Championship" },
        { id: 4, fighter1: "Dustin Poirier", fighter2: "Charles Oliveira", title: "" },
        { id: 5, fighter1: "Robert Whittaker", fighter2: "Paulo Costa", title: "" },
      ],
      prelimCard: [
        { id: 6, fighter1: "Calvin Kattar", fighter2: "Josh Emmett", title: "" },
        { id: 7, fighter1: "Marina Rodriguez", fighter2: "Mackenzie Dern", title: "" },
        { id: 8, fighter1: "Bryce Mitchell", fighter2: "Edson Barboza", title: "" },
        { id: 9, fighter1: "Marlon Vera", fighter2: "Song Yadong", title: "" },
      ],
    },
    {
      id: 2,
      name: "UFC 301: Pantoja vs. Royval 2",
      date: "May 18, 2025",
      venue: "Ibirapuera Gymnasium, São Paulo, Brazil",
      mainCard: [
        { id: 1, fighter1: "Alexandre Pantoja", fighter2: "Brandon Royval", title: "Flyweight Championship", isMain: true },
        { id: 2, fighter1: "José Aldo", fighter2: "Deiveson Figueiredo", title: "" },
        { id: 3, fighter1: "Gilbert Burns", fighter2: "Sean Brady", title: "" },
        { id: 4, fighter1: "Johnny Walker", fighter2: "Jamahal Hill", title: "" },
        { id: 5, fighter1: "Jessica Andrade", fighter2: "Amanda Lemos", title: "" },
      ],
      prelimCard: [
        { id: 6, fighter1: "Michel Pereira", fighter2: "Kevin Holland", title: "" },
        { id: 7, fighter1: "Caio Borralho", fighter2: "Jared Cannonier", title: "" },
        { id: 8, fighter1: "Angela Hill", fighter2: "Luana Pinheiro", title: "" },
        { id: 9, fighter1: "Gabriel Bonfim", fighter2: "Nicolas Dalby", title: "" },
      ],
    },
    {
      id: 3,
      name: "UFC 302: Makhachev vs. Poirier",
      date: "Jun 15, 2025",
      venue: "Madison Square Garden, New York, NY",
      mainCard: [
        { id: 1, fighter1: "Islam Makhachev", fighter2: "Dustin Poirier", title: "Lightweight Championship", isMain: true },
        { id: 2, fighter1: "Max Holloway", fighter2: "Justin Gaethje", title: "BMF Championship" },
        { id: 3, fighter1: "Jiri Prochazka", fighter2: "Magomed Ankalaev", title: "" },
        { id: 4, fighter1: "Alexa Grasso", fighter2: "Valentina Shevchenko", title: "Women's Flyweight Championship" },
        { id: 5, fighter1: "Movsar Evloev", fighter2: "Arnold Allen", title: "" },
      ],
      prelimCard: [
        { id: 6, fighter1: "Petr Yan", fighter2: "Cory Sandhagen", title: "" },
        { id: 7, fighter1: "Drew Dober", fighter2: "Renato Moicano", title: "" },
        { id: 8, fighter1: "Kayla Harrison", fighter2: "Ketlen Vieira", title: "" },
        { id: 9, fighter1: "Geoff Neal", fighter2: "Ian Garry", title: "" },
      ],
    },
  ];
  
  // Mock data for past events
  const pastEvents = [
    {
      id: 4,
      name: "UFC 299: O'Malley vs. Dvalishvili",
      date: "Mar 9, 2025",
      venue: "Kaseya Center, Miami, FL",
      mainCard: [
        { id: 1, fighter1: "Sean O'Malley", fighter2: "Merab Dvalishvili", title: "Bantamweight Championship", winner: "Sean O'Malley", method: "KO/TKO", round: 4, time: "3:12", isMain: true },
        { id: 2, fighter1: "Dustin Poirier", fighter2: "Benoit Saint Denis", title: "", winner: "Dustin Poirier", method: "KO/TKO", round: 2, time: "4:34" },
        { id: 3, fighter1: "Kevin Holland", fighter2: "Michael Page", title: "", winner: "Michael Page", method: "Decision", round: 3, time: "5:00" },
        { id: 4, fighter1: "Gilbert Burns", fighter2: "Jack Della Maddalena", title: "", winner: "Jack Della Maddalena", method: "Decision", round: 3, time: "5:00" },
        { id: 5, fighter1: "Petr Yan", fighter2: "Song Yadong", title: "", winner: "Petr Yan", method: "Decision", round: 3, time: "5:00" },
      ],
    },
    {
      id: 5,
      name: "UFC 298: Volkanovski vs. Topuria",
      date: "Feb 17, 2025",
      venue: "Honda Center, Anaheim, CA",
      mainCard: [
        { id: 1, fighter1: "Alexander Volkanovski", fighter2: "Ilia Topuria", title: "Featherweight Championship", winner: "Ilia Topuria", method: "KO/TKO", round: 2, time: "3:32", isMain: true },
        { id: 2, fighter1: "Robert Whittaker", fighter2: "Paulo Costa", title: "", winner: "Robert Whittaker", method: "Decision", round: 3, time: "5:00" },
        { id: 3, fighter1: "Geoff Neal", fighter2: "Ian Machado Garry", title: "", winner: "Ian Machado Garry", method: "Decision", round: 3, time: "5:00" },
        { id: 4, fighter1: "Merab Dvalishvili", fighter2: "Henry Cejudo", title: "", winner: "Merab Dvalishvili", method: "Decision", round: 3, time: "5:00" },
        { id: 5, fighter1: "Anthony Hernandez", fighter2: "Roman Kopylov", title: "", winner: "Anthony Hernandez", method: "Submission", round: 2, time: "3:23" },
      ],
    },
    {
      id: 6,
      name: "UFC 297: Strickland vs. Du Plessis",
      date: "Jan 20, 2025",
      venue: "Scotiabank Arena, Toronto, Canada",
      mainCard: [
        { id: 1, fighter1: "Sean Strickland", fighter2: "Dricus Du Plessis", title: "Middleweight Championship", winner: "Dricus Du Plessis", method: "Decision", round: 5, time: "5:00", isMain: true },
        { id: 2, fighter1: "Raquel Pennington", fighter2: "Mayra Bueno Silva", title: "Women's Bantamweight Championship", winner: "Raquel Pennington", method: "Decision", round: 5, time: "5:00" },
        { id: 3, fighter1: "Neil Magny", fighter2: "Mike Malott", title: "", winner: "Neil Magny", method: "TKO", round: 3, time: "4:45" },
        { id: 4, fighter1: "Chris Curtis", fighter2: "Marc-André Barriault", title: "", winner: "Chris Curtis", method: "Decision", round: 3, time: "5:00" },
        { id: 5, fighter1: "Movsar Evloev", fighter2: "Arnold Allen", title: "", winner: "Movsar Evloev", method: "Decision", round: 3, time: "5:00" },
      ],
    },
  ];

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Fight Schedule</h2>
          <p className="text-gray-400">Upcoming and past MMA events</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Input 
              className="bg-secondary-800 border-secondary-700 text-white pl-10"
              placeholder="Search events, fighters, or locations..."
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <Tabs defaultValue={tab} onValueChange={setTab}>
          <TabsList className="mb-6 bg-transparent border-b border-secondary-700">
            <TabsTrigger 
              value="upcoming" 
              className={`pb-2 ${tab === 'upcoming' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
            >
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger 
              value="past" 
              className={`pb-2 ml-6 ${tab === 'past' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'}`}
            >
              Past Events
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="bg-secondary-800 border-secondary-700 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-secondary-900 p-4 border-b border-secondary-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white">{event.name}</h3>
                          <div className="flex items-center text-sm text-gray-400 mt-1">
                            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                            <span>{event.date} • {event.venue}</span>
                          </div>
                        </div>
                        <Button className="bg-primary hover:bg-red-700 text-white">
                          Details
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-bold text-gray-300 mb-2">Main Card</h4>
                      <div className="space-y-3">
                        {event.mainCard.map((fight) => (
                          <div 
                            key={fight.id} 
                            className={`p-3 rounded-lg ${fight.isMain ? 'bg-secondary-700 border border-primary' : 'bg-secondary-900'}`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex-1 text-right pr-3">
                                <span className="text-white font-medium">{fight.fighter1}</span>
                              </div>
                              <div className="text-center px-3">
                                <span className="text-gray-500 font-bold">VS</span>
                                {fight.title && (
                                  <div className="text-xs text-primary mt-1">{fight.title}</div>
                                )}
                              </div>
                              <div className="flex-1 text-left pl-3">
                                <span className="text-white font-medium">{fight.fighter2}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <h4 className="font-bold text-gray-300 mt-6 mb-2">Preliminary Card</h4>
                      <div className="space-y-2">
                        {event.prelimCard.map((fight) => (
                          <div key={fight.id} className="p-3 rounded-lg bg-secondary-900">
                            <div className="flex justify-between items-center">
                              <div className="flex-1 text-right pr-3">
                                <span className="text-gray-300">{fight.fighter1}</span>
                              </div>
                              <div className="text-center px-3">
                                <span className="text-gray-500">VS</span>
                              </div>
                              <div className="flex-1 text-left pl-3">
                                <span className="text-gray-300">{fight.fighter2}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="space-y-6">
              {pastEvents.map((event) => (
                <Card key={event.id} className="bg-secondary-800 border-secondary-700 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-secondary-900 p-4 border-b border-secondary-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white">{event.name}</h3>
                          <div className="flex items-center text-sm text-gray-400 mt-1">
                            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                            <span>{event.date} • {event.venue}</span>
                          </div>
                        </div>
                        <Button className="bg-secondary-900 hover:bg-secondary-700 text-white border border-secondary-700">
                          Results
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-bold text-gray-300 mb-2">Main Card Results</h4>
                      <div className="space-y-3">
                        {event.mainCard.map((fight) => (
                          <div 
                            key={fight.id} 
                            className={`p-3 rounded-lg ${fight.isMain ? 'bg-secondary-700' : 'bg-secondary-900'}`}
                          >
                            <div className="grid grid-cols-7 gap-2 items-center">
                              <div className="col-span-3 text-right">
                                <span className={`font-medium ${fight.winner === fight.fighter1 ? 'text-white font-bold' : 'text-gray-400'}`}>
                                  {fight.fighter1}
                                </span>
                              </div>
                              <div className="col-span-1 text-center">
                                <span className="text-gray-500">VS</span>
                              </div>
                              <div className="col-span-3 text-left">
                                <span className={`font-medium ${fight.winner === fight.fighter2 ? 'text-white font-bold' : 'text-gray-400'}`}>
                                  {fight.fighter2}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-2 text-center">
                              <div className="text-xs text-gray-400">
                                {fight.title && (
                                  <span className="text-primary mr-2">{fight.title}</span>
                                )}
                                <span className="text-gray-300">Winner: </span>
                                <span className="text-white">{fight.winner}</span>
                                <span className="mx-1">•</span>
                                <span>{fight.method}</span>
                                <span className="mx-1">•</span>
                                <span>R{fight.round} {fight.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}