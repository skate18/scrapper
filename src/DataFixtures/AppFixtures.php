<?php

namespace App\DataFixtures;

use App\Entity\Company;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i <= 5; $i++) {
            $company = new Company();
            $company->setName('Test Company ' . $i);
            $company->setRegistrationCode(mt_rand(103341878, 903341878));
            $company->setAddress("Test address " . $i);
            $company->setCreatedAt(new \DateTimeImmutable());
            $manager->persist($company);
        }
        $manager->flush();
    }
}
