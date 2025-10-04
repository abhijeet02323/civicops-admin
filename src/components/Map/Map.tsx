import React, { useEffect, useRef } from 'react'
import 'ol/ol.css'
import './Map.css'
import Map from 'ol/Map'
import View from 'ol/View'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { OSM } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import { Feature } from 'ol'
import Point from 'ol/geom/Point'
import VectorSource from 'ol/source/Vector'
import { Icon, Style } from 'ol/style'
import { defaults as defaultControls } from 'ol/control'

interface ReportLocation {
  id: string | number
  title: string
  longitude: number
  latitude: number
}

interface OLMapProps {
  center?: [number, number] // [lon, lat]
  zoom?: number
  reports?: ReportLocation[]
}

const OLMap: React.FC<OLMapProps> = ({ center = [78.9629, 20.5937], zoom = 4, reports = [] }) => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapObj = useRef<Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    mapObj.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat(center),
        zoom
      }),
      controls: defaultControls({ attribution: false, rotate: false })
    })

    return () => {
      mapObj.current?.setTarget(undefined)
      mapObj.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapObj.current) return

    // remove previous report layers
    const existing = mapObj.current.getLayers().getArray().filter(l => (l as any).get('name') === 'reports-layer')
    existing.forEach(l => mapObj.current?.removeLayer(l))

    if (!reports || reports.length === 0) return

    const features: Feature<Point>[] = reports.map(r => {
      const f = new Feature({
        geometry: new Point(fromLonLat([r.longitude, r.latitude])),
        name: r.title,
        id: r.id
      })
      f.setStyle(new Style({
        image: new Icon({
          src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="%23ef4444"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5A2.5 2.5 0 1114.5 9 2.5 2.5 0 0112 11.5z"/></svg>'
        })
      }))
      return f
    })

    const vectorSource = new VectorSource({ features })
    const vectorLayer = new VectorLayer({
      source: vectorSource
    })
    // mark the layer so we can remove it later
    ;(vectorLayer as any).set('name', 'reports-layer')

    mapObj.current.addLayer(vectorLayer)

    // Optional: zoom to fit markers
    if (features.length === 1) {
      const geom = features[0].getGeometry() as Point
      mapObj.current.getView().animate({ center: geom.getCoordinates(), zoom: Math.max(8, zoom) })
    } else if (features.length > 1) {
      const extent = vectorSource.getExtent()
      mapObj.current.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 12 })
    }

  }, [reports])

  return <div className="ol-map-container" ref={mapRef} />
}

export default OLMap
