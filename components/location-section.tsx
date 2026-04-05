import { MapPin, Clock, Calendar } from "iconoir-react"

export function LocationSection() {
  return (
    <section id="location" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Truck Icon */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img
              src="/graphics/truck.svg"
              alt="Camión de Comida"
              className="h-16 w-16 object-contain"
            />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary tracking-tight">UBICACIÓN</h2>
            <img
              src="/graphics/truck.svg"
              alt="Camión de Comida"
              className="h-16 w-16 object-contain transform scale-x-[-1]"
            />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encuentranos todos los días en Ayacucho, Huamanga
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Placeholder */}
          <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-secondary">
            <img src="/map-of-ayacucho-peru-huamanga-area-street-map.jpg" alt="Mapa de Ubicación" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-background/40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/30 rounded-full animate-ping" />
                <div className="relative w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="space-y-8">
            {/* Main Location Card */}
            <div className="p-8 bg-card border border-border rounded-2xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Ubicación Principal</h3>
                  <p className="text-lg text-muted-foreground">
                    Ayacucho, Huamanga
                    <br />
                    Manzana I, Lote 12<br />
                    Perú
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">¡Todos los Días!</h3>
                  <p className="text-muted-foreground">Visítanos diariamente para disfrutar de nuestras hamburguesas y comida deliciosa</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Horario de Atención</h3>
                  <p className="text-muted-foreground">6:00 AM - 12:00 PM</p>
                </div>
              </div>
            </div>

            {/* Events Banner */}
            <div className="p-6 bg-primary/10 border border-primary/30 rounded-xl">
              <h4 className="text-xl font-bold text-primary mb-2">Eventos, Fiestas y Celebraciones</h4>
              <p className="text-foreground">
                ¡Catering disponible para eventos privados! Contáctanos para ofertas especiales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
