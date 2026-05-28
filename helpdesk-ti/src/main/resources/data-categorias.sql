-- Script SQL inicial - Anexo D del Informe Semana 10
-- Ejecutar en la BD 'desarrollo' después del primer arranque del sistema

INSERT INTO categoria (nombre, descripcion, requiere_validacion_prov) VALUES
  ('Fallas de Red',       'Problemas de conectividad y red LAN/WAN',        false),
  ('Caida de Servicios',  'Caida de servidores o servicios criticos',        false),
  ('Hardware Corporativo','Equipos de videoconferencia e impresion',         true),
  ('Software',            'Problemas con aplicaciones y configuracion',      false),
  ('Perifericos',         'Teclados, mouse, monitores y otros',              false)
ON CONFLICT (nombre) DO NOTHING;
