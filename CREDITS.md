# Фото Acoperirea — источники

С 2026-10-14 (дизайн по Sonder House) все фото стоковые с Pexels (бесплатная лицензия Pexels, указывать автора не обязательно). Исходники лежали в scratchpad сессии, обрезка — скриптом из той же сессии.

| Файл | Pexels ID | Что на фото |
|---|---|---|
| hero-house.jpg | файл пользователя (2026-10-15) | кровельщик со страховкой укладывает покрытие; видны обрешётка, утеплитель, стропила; 1376×768. На рукаве неразборчивая надпись — проверить, что это не реальный бренд |
| svc-replace.webp | 7587467 | кирпичный дом с тёмной четырёхскатной крышей (снизу обрезана статуя в траве) |
| svc-new.webp | 31763537 | монтаж стропил |
| svc-mansard.webp | 16116303 | мансарда с окном |
| svc-repair.webp | 31763534 | старая черепичная крыша с трубой на ремонте (кадр 37623622 отклонён: логотип TATAPI на футболке и каске) |
| svc-gutters.webp | 20113440 | водосточный желоб |
| svc-insulation.webp | 6124239 | монтаж утеплителя |
| cov-metal.webp | 18513462 | металлочерепица |
| cov-profnastil.webp | 3523623 | профлист |
| cov-falt.webp | 26632635 | фальцевая кровля |
| cov-shingle.webp | 237907 | битумная черепица |
| cov-ceramic.webp | 16587704 | керамическая черепица |
| work-1-before / after | Gemini (пользователь, 2026-10-15) | настоящая пара: один дом, шифер → металлочерепица |
| work-2-before / after | Gemini (пользователь, 2026-10-15) | настоящая пара: стропила → битумная черепица |
| work-3-before / after | Gemini (пользователь, 2026-10-15) | настоящая пара: ржавый лист → фальц |
| pie-cutaway.webp | Gemini (пользователь, 2026-10-15) | разрез крыши на белом фоне |

Не используются: hero-night.webp (вечерний дом из Gemini, от первой версии дизайна).

---

## Промты Gemini для «До и после» (2026-10-15)

**Как делать пару.** Ползунок работает, только если оба кадра сняты с одной точки. Поэтому в Gemini **сначала генерируем «до»**, а **«после» делаем в том же чате правкой этой картинки** (промт «after» ниже). Тогда ракурс, деревья, забор и свет не изменятся, поменяется только крыша.

Формат: горизонтальный **16:9**, как можно крупнее. Файлы называть как в скобках и класть в Загрузки, я сам обрежу их и переведу в webp.

### Пара 1 — Яловень, шифер → металлочерепица (`work-1-before`, `work-1-after`)

**До:**
> Photorealistic photo of a large full-size single-storey family house in Moldova (not a small cottage or summer hut): footprint about 10 × 12 meters, around 120 m² of living space, long facade with 5 windows and a front door, walls about 3 m high, ridge about 6 m above the ground, roof area about 170 m². Light beige plastered walls with brick corners, simple gable roof covered with old grey wavy asbestos-cement slate sheets, slate is weathered, dark with moss and lichen, a few cracked and patched sheets, rusty old gutter hanging loose, brick chimney. Front yard with a low metal fence and a grapevine pergola, bright overcast daylight, shot from the yard at eye level, slight 3/4 angle so the whole roof is visible. Documentary real-estate style, no people, no text, no logos. 16:9.

**После (правка той же картинки):**
> Edit this exact photo: keep the same house, camera angle, walls, windows, fence, grapevine, trees and lighting unchanged. Replace only the roof: new dark graphite matte metal roof tiles (Monterrey profile) with a neat metal ridge cap, new dark grey metal gutters and downpipes, white soffits under the eaves, chimney with a clean metal flashing apron. Everything looks freshly finished and clean. Photorealistic, no text, no logos.

### Пара 2 — Стрэшень, новый дом, битумная черепица (`work-2-before`, `work-2-after`)

**До:**
> Photorealistic photo of a large new two-storey family house under construction in a Moldovan suburb (not a cottage): footprint about 11 × 13 meters, around 220 m² of living space, two full floors with 4–5 window openings per floor on the long facade, walls about 6 m high, roof area about 210 m². Walls of grey aerated concrete blocks, roof stage: bare wooden rafters of a hip roof partly covered with OSB boards, some sheets of light grey roofing membrane, a ladder against the wall, building materials stacked in the yard, sunny day, blue sky, shot from the street at eye level, 3/4 angle. No people, no text, no logos. 16:9.

**После (правка):**
> Edit this exact photo: keep the same house shape, camera angle, sky, yard and surroundings. Finish the roof: complete hip roof covered with dark brown bitumen shingles (hexagonal tabs), neat ridges, brown metal gutters and downpipes, brown soffits. Remove the ladder and construction materials, the yard is tidy. The walls can stay unfinished grey blocks. Photorealistic, no text, no logos.

### Пара 3 — Дурлешты, ржавый лист → фальц (`work-3-before`, `work-3-after`)

**До:**
> Photorealistic photo of a solid older one-storey brick family house in a Moldovan village (not a small cottage or shed): footprint about 9 × 11 meters, around 90 m² of living space, long facade with 4 windows and a covered porch, ridge about 5.5 m above the ground, roof area about 140 m². Gable roof covered with old rusty corrugated steel sheets with peeling paint and orange rust streaks, bent edges, brick chimney, old wooden window frames, autumn trees in the background, soft daylight, shot from the garden at eye level, 3/4 angle so the roof slope is clearly visible. No people, no text, no logos. 16:9.

**После (правка):**
> Edit this exact photo: keep the same house, camera angle, trees and lighting. Replace only the roof: new dark grey standing seam metal roof (double-lock seams, clean vertical lines, no visible screws), snow guards along the lower edge, new grey gutters and downpipes, chimney with neat metal flashing. Photorealistic, no text, no logos.

**Если Gemini всё равно рисует дачный домик**, допиши в конец: *"Scale reference: a standard car parked next to the house is about one third of the facade length."* — машина сразу задаёт масштаб.

**Если Gemini меняет ракурс при правке**, допиши в начало промта: *"Do not change the composition, crop or camera position. Only change the roof."* Если всё равно меняет, скинь мне обе картинки, я совмещу их по краям.
