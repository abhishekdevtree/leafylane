import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerAnimation', [
      transition(':enter', [
        query('.team-member', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('200ms', [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  imports: [RouterLink, CommonModule ]
})
export class AboutUs implements OnInit {

  nurseryImage: string = 'https://louisiananursery.com/wp-content/uploads/2025/08/DSC01030-1024x683.jpg';
  ctaBackground: string = 'https://cdn.dtsdev.xyz/blog/1723631199252.jpg';
  imageLoaded: boolean = false;


  values = [
    {
      icon: 'fas fa-seedling',
      title: 'Sustainable Growth',
      description: 'We practice eco-friendly cultivation methods and actively promote sustainable gardening practices to support a greener, healthier future.'
    },
    {
      icon: 'fas fa-heart',
      title: 'Passionate <br> Care',
      description: 'Every plant receives individual attention from our dedicated team of experienced and highly skilled horticulture experts.'
    },
    {
      icon: 'fas fa-leaf',
      title: 'Quality Assurance',
      description: 'Only the healthiest, strongest, and most vibrant plants are chosen to journey safely from our nursery to your home.'
    }
  ];

  teamMembers = [
    {
      name: 'Emily Greenfield',
      role: 'Founder & Head Horticulturist',
      description: 'With over 20 years of experience, Emily started LeafyLane with a vision to make gardening accessible to everyone.',
      image: 'https://img.freepik.com/free-photo/medium-shot-man-city-lifestyle_23-2151002654.jpg?t=st=1766038003~exp=1766041603~hmac=51553f5e19a2dc0e4f96845fef9204e59a24d4e77f1796c7687b0fdda4d5f8f8&w=1480',
      expertise: ['Botany', 'Landscape Design', 'Organic Gardening']
    },
    {
      name: 'Marcus Chen',
      role: 'Plant Care Specialist',
      description: 'Marcus has a green thumb for reviving challenging plants and loves teaching others his techniques.',
      image: 'https://img.freepik.com/free-photo/close-up-man-smiling-nature_23-2150771113.jpg?t=st=1766038162~exp=1766041762~hmac=6f90bee74e94a252419580570b5c9f7bb7f7d801a12f053e02fdacf1863a868c&w=1480',
      expertise: ['Plant Health', 'Pruning', 'Soil Science']
    },
    {
      name: 'Sophia Rodriguez',
      role: 'Customer Experience Director',
      description: 'Sophia ensures every visitor leaves with not just plants, but knowledge and inspiration for their garden.',
      image: 'https://img.freepik.com/premium-photo/man-with-beard-smiling-with-his-arms-crossed_1018793-1075.jpg',
      expertise: ['Customer Service', 'Workshops', 'Garden Planning']
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}