#Dadhboard
-'/'
  - statystyki dziszejszych zamówien (zdalne i lokalne)
  - listę rezerwacji i eventów zaplanowanych na dzisaj
#Logowanie
-'/login'
  - pola na login i hasło
  - guzik do zalogowania (link do dashboard)
#Widok dostępności stolików
-'/tables'
  - wybór daty i godziny
  - tabela z listą rezerwacji oraz wydarzeń
    - każda kolumna = 1 stolików
    - każdy wiersz = 30 minut
    - ma przypominać widok tygodna w kalendarzu googla, gdzie w kolumnach zamiast dni są różne stoliki
    - po kliknięciu rezerwacji lun eventu, przchodzimy na stronę szczegółów

-'/tables/booking/:id'
    - zawiera wszystkie informacje dotyczące rezerwacji
    - umożliwia edycję i zapisywanie zmian

-'/tables/booking/new'
    - analogicznie do powyższej, bez początkowych informacji

//wydarzenia dodawane przez pracowników
-'/tables/events/:id'  
  - analogicznie do powyższej, dla eventów
-'/tables/events/new'  
  - analogicznie do powyższej, dla eventów, bez początkowych informacji
# Widok kelnera
-'/waiter'  - info czy ktoś złożył zamówienie
 - tabela
   - w wierszach stoliki
   - w kolumnach różne rodzaje informacji (status, czas od ostatniej aktywności)
   - w ostatnie kolumnie dostępne akcje dla danego stolika
-'waiter/order/new'
  - numer stolika (edytowalny)
  - menu produktów
  - opcje wybranego produktu
  - zamówienie (zamówienie produkty z opcjami i ceną)
  - kwotę zamówienia
-'waiter/order/:id'
 - jak powyższa
#Widok kuchni
-'/kitchen'
  - wyświetlać listę zamówień w kolejności złorzenia
  - lista musi zawierać:
      - numer stolika (lub zamówienia zdalnego)
      - pełne informacje dot. zamówionych dań
  - na liście musi być możliwość oznaczenia zamówienia jako zrealizowane


  Każde zamówienie w naszej restauracji będzie miało swój "cykl życia", czyli różne etapy, na których będzie sie znajdować. Przyjmiemy, że zamówienie będzie mogło mieć jeden z następujących statusów:

  new – zamówienie w trakcie składania, jeszcze nie realizujemy,
  ordered – zamówienie złożone, należy zrealizować,
  ready – zamówienie przygotowane, należy dostarczyć,
  in delivery – [tylko z dostawą] zamówienie w trakcie dostawy,
  delivered – [tylko lokalne] zamówienie zostało dostarczone, ale jeszcze nie opłacone,
  done – zamówienie zostało dostarczone i opłacone,
  cancelled – zamówienie anulowane.
  W przypadku zamówień z dostawą status ordered oznacza zamówienie opłacone, a w przypadku zamówień lokalnych – tylko złożone, ponieważ klient płaci po zjedzeniu. Dlatego status delivered będziemy stosować tylko w lokalu, a zamówienia z dostawą będą przeskakiwać od razu z in delivery na done. Analogicznie, kelner w restauracji nie będzie używał statusu in delivery, tylko zmieni status z ready na delivered.
